import {MetaManifest} from "@web3api/client-js";

export interface MetaData extends MetaManifest {
  iconImage?: string;
  links?: {
    name: string;
    icon?: string;
    url: string;
    iconImage?: string;
  }[];
}