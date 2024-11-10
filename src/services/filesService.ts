import { SYSTEM_ERROR } from "config/CONSTANT";
import { GET_ALL_ALBULMS } from "./CONSTANT";
import axios from "./fileInstance";

export const getAllFiles = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any[]>((resolve, reject) => {
        try {
          axios
            .get(
                GET_ALL_ALBULMS,
                {
                    params: {
                        _start: 11,
                        _end: 18
                    },
                },
            )
            .then((res) => {
              resolve(res.data);
            })
            .catch((err) => {
              console.log('getAllUsers > axios err=', err);
              reject({ ...err, message: `Error in getAllUsers axios! ${err.message}` });
            });
        } catch (error) {
          console.error('in userServices > getAllUsers, Err===', error);
          reject(SYSTEM_ERROR);
        }
      });
}