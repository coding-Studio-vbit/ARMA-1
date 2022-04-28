import {
  CloudDownloadTwoTone,
  CloudUploadTwoTone,
  Edit,
  Feedback,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../utils/axios";

export default function EventBudget() {
  const location: any = useLocation();
  const [event, setEvent] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    console.log(location.state);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}events/getEvent/${location.state.eventId}`
      )
      .then((response) => {
        console.log(response.data.response);
        setEvent(response.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="flex flex-col sm:mt-12 ">
      <div className="flex justify-center items-center mb-16  gap-2">
        <span className="sm:text-2xl shrink text-xl font-semibold  text-arma-dark-blue ">
          {event?.name} - Budget
        </span>
        {!isEdit && (
          <Edit onClick={() => setIsEdit(true)} className="cursor-pointer" />
        )}
      </div>
      <div className="flex flex-col items-center  sm:mx-auto ">
        <div className="flex flex-col max-w-[80%] w-[600px]">
          <div className="flex gap-2">
            <span className="text-gray-600 text-lg lg:text-xl">
              FO Comments
            </span>
            <Feedback className="text-arma-title" />
          </div>
          <div className="p-4 rounded-xl shadow-xl">
            {event?.FOComments ? event.FOCOmments : "No Comments"}
          </div>
        </div>
        {!isEdit && (
          <span className="text-lg lg:text-xl mr-auto ml-16 mt-10 text-gray-600">
            {" "}
            Event Budget Document
          </span>
        )}
        {isEdit ? (
          <div className="flex   mt-8  flex-col  gap-4">
            <span className=" text-lg lg:text-xl text-gray-600">
              Event Budget Document
            </span>
            <label className="rounded-[8px] flex justify-center hover:bg-slate-500/10 !cursor-pointer  px-20 py-10  lg:px-24 lg:py-14 outline-dashed outline-gray-500">
              <div className="flex flex-col">
                <CloudUploadTwoTone className="!w-20  !h-20 mx-auto  text-arma-blue " />
                <span>Click here to upload the budget document</span>
              </div>

              <input
                id="file-upload"
                accept="application/pdf"
                disabled={!isEdit}
                onChange={(e: any) => {
                  console.log(e.target.files[0].size);
                  console.log("dihdiuj");

                  //   setPdf2(e.target.files[0]);
                }}
                className="hidden"
                type="file"
              ></input>
            </label>
            {/* {pdf2 && <p className="m-0 p-0 truncate">{pdf2.name}</p>} */}
          </div>
        ) : (
          <div className="flex flex-col mt-10 cursor-pointer">
            <CloudDownloadTwoTone className="!w-20  !h-20 mx-auto  text-arma-blue " />
            <span>
              <a
                onClick={async () => {
                  const result = await axios({responseType: 'blob', method: 'GET', url:`${process.env.REACT_APP_SERVER_URL}events/getBudgetDocument/${location.state.eventId}`})
                  const url = window.URL.createObjectURL(
                    new Blob([result.data])
                  );
                  const link = document.createElement("a");
                  link.href = url;
                  link.setAttribute("download", "budget.pdf"); //or any other extension
                  document.body.appendChild(link);
                  link.click();
                }}
                download
              >
                Click here to download the budget document
              </a>
            </span>
          </div>
        )}
      </div>
      {isEdit && (
        <button
          onClick={() => {
            setIsEdit(false);
          }}
          className="btn mx-auto mt-10"
        >
          {" "}
          Update{" "}
        </button>
      )}
    </div>
  );
}
