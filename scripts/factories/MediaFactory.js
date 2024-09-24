import { Image } from "../classes/image.js";
import { Video } from "../classes/video.js";

export class MediaFactory {
  constructor(data) {
    if (data.image) {
      return new Image(data);
    } else if (data.video) {
      return new Video(data);
    } else {
      throw new Error("Invalid data");
    }
  }
}
