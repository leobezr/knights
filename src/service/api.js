import Axios from "axios";
import HTTP from "./http";

class Api {
   constructor(options) {
      this.header = options.header || null;
      this.server = options.server || null;
   }
   POST(props) {
      return Axios({
         url: this.server + props.url,
         headers: { ...customHeader },
         method: "POST",
         data: props.body,
      });
   }
   GET(props) {
      return Axios({
         url: this.server + props.url,
         method: "GET",
         headers: { ...customHeader },
      })
   }
}

const customHeader = {
   "Access-Control-Allow-Origin": "*"
}

export default new Api({ server: HTTP.server, header: customHeader });
