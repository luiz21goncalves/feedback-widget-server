import { SubmitFeedbackUseCase } from './submitFeedbackUseCase';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const sut = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy },
);

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      sut.execute({
        type: 'BUG',
        comment: 'expect comment',
        screenshot: 'data:image/png;base64,asdifbasdifhuasdfbasdkhjfb',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalledWith({
      type: 'BUG',
      comment: 'expect comment',
      screenshot: 'data:image/png;base64,asdifbasdifhuasdfbasdkhjfb',
    });
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('should not be able to submit feedback with invalid screenshot', async () => {
    await expect(
      sut.execute({
        type: 'BUG',
        comment: 'comment',
        screenshot: 'file.png',
      }),
    ).rejects.toThrow('Invalid screenshot format');

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit feedback without type', async () => {
    await expect(
      sut.execute({
        type: '',
        comment: 'new bug',
      }),
    ).rejects.toThrow('Type is required');

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });

  it('should not be able to submit feedback without comment', async () => {
    await expect(
      sut.execute({
        type: 'BUG',
        comment: '',
      }),
    ).rejects.toThrow('Comment is required');

    expect(createFeedbackSpy).not.toHaveBeenCalled();
    expect(sendMailSpy).not.toHaveBeenCalled();
  });
});
