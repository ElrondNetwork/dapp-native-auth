import * as React from "react";
import { useContext as useDappContext } from "@elrondnetwork/dapp";
import { faSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getSignedToken } from "../helpers/asyncRequests";

import CopyButton from "../../../components/CopyButton";

const GetToken = () => {
  const {
    dapp: { provider },
    address,
  } = useDappContext();
  const [token, setToken] = React.useState<string | undefined>();

  const handleGenerateToken = async () => {
    const generatedToken = await getSignedToken(address, provider);
    setToken(generatedToken);
  };

  return (
    <>
      <div className="action-btn">
        <button onClick={handleGenerateToken} className="btn generate-btn">
          <FontAwesomeIcon icon={faSign} className="text-primary" />
        </button>
        <a href="/" className="text-white text-decoration-none">
          generate Auth token
        </a>
        {token != null && (
          <div className={"d-flex flex-column"}>
            <textarea disabled value={token} />
            <CopyButton text={token} />
          </div>
        )}
      </div>
    </>
  );
};
export default GetToken;
