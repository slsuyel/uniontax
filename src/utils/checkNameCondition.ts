import { TService } from "@/types";

export const checkNameCondition = (
  services: TService[],
  sonodName: string | undefined,
  condition: string | undefined
) => {
  const name = services.find((service) => service.title === sonodName);

  const condition_bn =
    condition == "Pending"
      ? "নতুন আবেদন"
      : condition == "approved"
      ? "অনুমোদিত আবেদন"
      : "বাতিল আবেদন";

  return {
    s_name: name?.title,
    condition_bn,
  };
};
