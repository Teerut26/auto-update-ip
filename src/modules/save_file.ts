import { promises as fsp } from "fs";
import ip from "ip";

export interface DataSave {
  ip: string;
  timestamp: string;
}
export default async (new_data:DataSave) => {
  try {
    let old_data_raw = await fsp.readFile("data.json");
    let old_data: DataSave[] = JSON.parse(old_data_raw.toString());

    if (old_data.length >= 100) {
      old_data.splice(-1)
    }

    return await fsp.writeFile(
      "data.json",
      JSON.stringify([new_data, ...old_data])
    );
  } catch (error) {
    throw error;
  }
};
