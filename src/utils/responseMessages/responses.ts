export const invalidProductReponse = {
  status: 400,
  body: {
    data: null,
    error: {
      message: "Products are not valid.",
    },
  },
};

export const invalidCartResponse = {
  status: 404,
  body: {
    data: null,
    error: {
      message: "Cart was not found.",
    },
  },
};

export const responseBody = (isDeleted: boolean, cartId: string) => {
  if (isDeleted) {
    return {
      data: {
        success: true,
      },
      error: null,
    };
  } else {
    return {
      data: {
        success: false,
      },
      error: `Cart with ID: ${cartId} does not exist. Please check the provided cart ID.`,
    };
  }
};
