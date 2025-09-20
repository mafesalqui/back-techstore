// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";

const replaceUploadsWithMediaPrefix = (obj: Event) => {
  let MEDIA_PREFIX = "http://localhost:1337";

  if (process.env.MEDIA_PREFIX) {
    MEDIA_PREFIX = process.env.MEDIA_PREFIX;
  }

  MEDIA_PREFIX += "/uploads/";

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = replaceUploadsWithMediaPrefix(obj[i]);
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (
        typeof obj[key] === "string" &&
        obj[key].startsWith("/uploads") &&
        key === "url"
      ) {
        obj[key] = obj[key].replace(/\/uploads\//g, MEDIA_PREFIX);
      } else {
        obj[key] = replaceUploadsWithMediaPrefix(obj[key]);
      }
    }
  }
  return obj;
};

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db?.lifecycles.subscribe({
      afterFindOne(event: any) {
        event.result = replaceUploadsWithMediaPrefix(event.result);
      },
      afterFindMany(event: any) {
        event.result = replaceUploadsWithMediaPrefix(event.result);
      },
    });
  },
};