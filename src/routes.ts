import { Router } from 'express';

import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailerMailAdapter';
import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

const routes = Router();

routes.post('/feedbacks', async (request, response) => {
  const { type, comment, screenshot } = request.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerAdapter,
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return response.status(201).send();
});

export { routes };
