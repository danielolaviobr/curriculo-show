import { decode } from "base64-arraybuffer";
import { z } from "zod";
import puppeteer from "puppeteer";
import { supabase } from "../../utils/supabase";
import { createProtectedRouter } from "./protected-router";
import { Resume } from "@prisma/client";
import { getBaseUrl } from "../../pages/_app";

// Example router with queries that can only be hit if the user requesting is signed in
export const resumeRouter = createProtectedRouter()
  .mutation("upsert", {
    input: z.object({
      id: z.string().nullable().optional(),
      resumeTitle: z.string().nullable(),
      firstName: z.string().nullable(),
      lastName: z.string().nullable(),
      currentTitle: z.string().nullable(),
      email: z.string().nullable(),
      phone: z.string().nullable(),
      website: z.string().nullable(),
      summary: z.string().nullable(),
      education: z.array(
        z.object({
          id: z.string(),
          institution: z.string().nullable(),
          degree: z.string().nullable(),
          city: z.string().nullable(),
          state: z.string().nullable(),
          startDate: z.date().nullable().optional(),
          endDate: z.date().nullable().optional(),
          description: z.string().nullable(),
          index: z.number(),
        })
      ),
      experience: z.array(
        z.object({
          id: z.string(),
          company: z.string().nullable(),
          position: z.string().nullable(),
          isCurrent: z.boolean().nullable(),
          city: z.string().nullable(),
          state: z.string().nullable(),
          startDate: z.date().nullable().optional(),
          endDate: z.date().nullable().optional(),
          description: z.string().nullable(),
          index: z.number(),
        })
      ),
      projects: z.array(
        z.object({
          id: z.string(),
          title: z.string().nullable(),
          description: z.string().nullable(),
          index: z.number(),
        })
      ),
    }),
    async resolve({ ctx, input }) {
      const resume = await ctx.prisma.resume.upsert({
        where: { id: input.id || "" },
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          currentTitle: input.currentTitle,
          summary: input.summary,
          email: input.email,
          phone: input.phone,
          resumeTitle: input.resumeTitle,
          website: input.website,
          user: { connect: { email: ctx.session.user.email as string } },
          template: "BASIC",
          experience: {
            create: input.experience.map((experience) => ({
              id: experience.id,
              city: experience.city,
              company: experience.company,
              description: experience.description,
              state: experience.state,
              position: experience.position,
              endDate: experience.endDate,
              startDate: experience.startDate,
              isCurrent: experience.isCurrent,
              index: experience.index,
            })),
          },
          education: {
            create: input.education.map((education) => ({
              id: education.id,
              city: education.city,
              institution: education.institution,
              description: education.description,
              state: education.state,
              degree: education.degree,
              endDate: education.endDate,
              startDate: education.startDate,
              index: education.index,
            })),
          },
          projects: {
            create: input.projects.map((project) => ({
              id: project.id,
              title: project.title,
              description: project.description,
              index: project.index,
            })),
          },
        },
        update: {
          firstName: input.firstName,
          lastName: input.lastName,
          currentTitle: input.currentTitle,
          summary: input.summary,
          email: input.email,
          phone: input.phone,
          resumeTitle: input.resumeTitle,
          website: input.website,
          user: { connect: { email: ctx.session.user.email as string } },
          template: "BASIC",
          experience: {
            upsert: input.experience.map((experience) => ({
              where: { id: experience.id },
              create: {
                id: experience.id,
                city: experience.city,
                company: experience.company,
                description: experience.description,
                state: experience.state,
                position: experience.position,
                endDate: experience.endDate,
                startDate: experience.startDate,
                isCurrent: experience.isCurrent,
                index: experience.index,
              },
              update: {
                city: experience.city,
                company: experience.company,
                description: experience.description,
                state: experience.state,
                position: experience.position,
                endDate: experience.endDate,
                startDate: experience.startDate,
                isCurrent: experience.isCurrent,
                index: experience.index,
              },
            })),
          },
          education: {
            upsert: input.education.map((education) => ({
              where: { id: education.id },
              create: {
                id: education.id,
                city: education.city,
                institution: education.institution,
                description: education.description,
                state: education.state,
                degree: education.degree,
                endDate: education.endDate,
                startDate: education.startDate,
                index: education.index,
              },
              update: {
                city: education.city,
                institution: education.institution,
                description: education.description,
                state: education.state,
                degree: education.degree,
                endDate: education.endDate,
                startDate: education.startDate,
                index: education.index,
              },
            })),
          },
          projects: {
            upsert: input.projects.map((project) => ({
              where: { id: project.id },
              create: {
                id: project.id,
                title: project.title,
                description: project.description,
                index: project.index,
              },
              update: {
                title: project.title,
                description: project.description,
                index: project.index,
              },
            })),
          },
        },
        select: { id: true },
      });
      const previewImage = await getPreviewImage(resume.id);
      await savePreviewImage(previewImage, resume.id);
      return resume;
    },
  })
  .mutation("duplicate", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const resume = await ctx.prisma.resume.findFirstOrThrow({
        where: { id: input.id, user: { email: ctx.session.user.email || "" } },
        include: { education: true, experience: true, projects: true },
      });
      const { id, createdAt, updatedAt, ...cleanResume } = resume;
      const duplicateResume = await ctx.prisma.resume.create({
        select: {
          id: true,
          previewImage: true,
          updatedAt: true,
          resumeTitle: true,
        },
        data: {
          ...cleanResume,
          education: {
            createMany: {
              data: cleanResume.education.map((education) => {
                const {
                  id,
                  createdAt,
                  updatedAt,
                  resumeId,
                  ...cleanEducation
                } = education;
                return cleanEducation;
              }),
            },
          },
          experience: {
            createMany: {
              data: cleanResume.experience.map((experience) => {
                const {
                  id,
                  createdAt,
                  updatedAt,
                  resumeId,
                  ...cleanExperience
                } = experience;
                return cleanExperience;
              }),
            },
          },
          projects: {
            createMany: {
              data: cleanResume.projects.map((project) => {
                const { id, createdAt, updatedAt, resumeId, ...cleanProject } =
                  project;
                return cleanProject;
              }),
            },
          },
        },
      });
      return { resume: duplicateResume };
    },
  })
  .mutation("delete", {
    input: z.object({ id: z.string() }),
    async resolve({ ctx, input }) {
      const id = await ctx.prisma.resume.delete({
        where: { id: input.id },
        select: { id: true },
      });

      return id;
    },
  });

async function getPreviewImage(resumeId: string) {
  const browser = await puppeteer.launch({
    args: [`--window-size=1080,720`],
    defaultViewport: {
      width: 1080,
      height: 720,
    },
  });

  const page = await browser.newPage();
  await page.goto(`${getBaseUrl()}/pdf/preview/${resumeId}`);
  const image = await page.screenshot({ encoding: "base64", type: "jpeg" });
  await browser.close();

  const { data, error } = await supabase.storage
    .from("resume-previews")
    .upload(`${resumeId}.jpeg`, decode(image as string), {
      cacheControl: "10",
      upsert: true,
      contentType: "image/jpeg",
    });

  if (error) throw new Error(JSON.stringify(error));

  const {
    data: { publicUrl },
  } = supabase.storage.from("resume-previews").getPublicUrl(data.path);

  return publicUrl;
}

async function savePreviewImage(previewImage: string, resumeId: string) {
  await prisma?.resume.update({
    where: { id: resumeId },
    data: { previewImage },
  });
}
