import { MailAdapter } from '../adapters/mailAdapter';
import { FeedbacksRepository } from '../repositories/feedbacksRepository';

interface SubmitFeedbackUseCaseResquest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private readonly feedbacksRepository: FeedbacksRepository,
    private readonly mailAdapter: MailAdapter,
  ) {}

  async execute({
    comment,
    type,
    screenshot,
  }: SubmitFeedbackUseCaseResquest): Promise<void> {
    if (!type) {
      throw new Error('Type is required');
    }

    if (!comment) {
      throw new Error('Comment is required');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
      ].join('\n'),
      from: {
        name: 'Equipe Feedget',
        email: 'naoresponda@feedget.com.br',
      },
      to: {
        name: 'Luiz Gonçalves',
        email: 'luizhbgoncalves@gmail.com',
      },
    });
  }
}
