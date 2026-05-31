export const NEWSLETTER_EXCHANGE = 'newsletter.exchange';
export const POST_PUBLISHED_ROUTING_KEY = 'post.published';
export const POST_PUBLISHED_QUEUE = 'newsletter.post-published';

export type PostPublishedEvent = {
  postId: number;
  title: string;
  slug: string | null;
};
