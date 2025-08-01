import { convexAuth } from "@convex-dev/auth/server";
import Github from "@auth/core/providers/github";
import {Password} from "@convex-dev/auth/providers/Password";
import Google from "@auth/core/providers/google";
import {DataModel} from "./_generated/dataModel";

export const CustomPassword =  Password<DataModel>({
  profile(params, ctx) {
    return {
      email: params.email as string,
      name: params.name as string,
    };
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Github, Google, Password],
});
