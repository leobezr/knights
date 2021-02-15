import Axios from "axios";
import HTTP from "./http";

const exposeHeader = props => {
   return props.header ? { ...props } : {}
};
const token = () => localStorage.userToken || null;
const charToken = () => localStorage.charToken || null

class Api {
   constructor(options) {
      this.header = options.header || null;
      this.server = options.server || null;
   }
   POST(props) {
      return Axios({
         url: this.server + props.url,
         headers: { ...customHeader(), ...exposeHeader(props) },
         method: "POST",
         data: props.body,
      });
   }
   PUT(props) {
      return Axios({
         url: this.server + props.url,
         headers: { ...customHeader(), ...exposeHeader(props) },
         method: "PUT",
         data: props.body,
      });
   }
   GET(props) {
      return Axios({
         url: this.server + props.url,
         method: "GET",
         headers: { ...customHeader(), ...exposeHeader(props) },
      })
   }
   DELETE(props) {
      return Axios({
         url: this.server + props.url,
         method: "DELETE",
         headers: { ...customHeader(), ...exposeHeader(props) },
      })
   }
}

const customHeader = () => {
   return {
      "Access-Control-Allow-Origin": "*",
      "Authorization": token(),
      "CharAuth": charToken()
   }
}

export default new Api({ server: HTTP.server, header: customHeader });
