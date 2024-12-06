import type { User } from "~/types";

export const useUser = () => {
  const user: Ref<User | null> = useState("currentUser", () => null);
  const profile = computed(() => user.value?.profile);

  const fetch = async () => {
    const { me } = await GqlMe();
    user.value = me;
  };

  return {
    user,
    profile,
    fetch,
  };
};
