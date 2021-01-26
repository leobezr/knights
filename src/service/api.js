import Axios from "axios";
import HTTP from "./http";

const exposeHeader = props => {
   return props.header ? { ...props } : {}
};
const token = () => {
   let id = localStorage.sessionId;

   if (id) {
      return id
   } else {
      return null
   }
};

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
}

const customHeader = () => {
   return {
      "Access-Control-Allow-Origin": "*",
      "Requester": token()
   }
}

export default new Api({ server: HTTP.server, header: customHeader });
