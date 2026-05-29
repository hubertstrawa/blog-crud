export type SignUpFormState =
  | {
      data: {
        name?: string;
        email?: string;
        password?: string;
      };
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;

export type CreateCommentFormState =
  | {
      data?: {
        postId?: number;
        content?: string;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      ok?: boolean;
      open?: boolean;
    }
  | undefined;

export type PostFormState =
  | {
      data?: {
        postId?: number;
        title?: string;
        content?: string;
        thumbnail?: string;
        tags?: string;
        published?: boolean;
        previousThumbnailUrl?: string;
      };
      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        published?: string[];
      };
      message?: string;
      ok?: boolean;
    }
  | undefined;
