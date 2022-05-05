import { prisma } from '../../prisma';
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from '../feedbacksRepository';

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    comment,
    type,
    screenshot,
  }: FeedbackCreateData): Promise<void> {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}
