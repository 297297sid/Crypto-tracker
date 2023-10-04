import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CryptoTracker.css";

function CryptoTracker() {
  const [coinType, setCoinType] = useState("");
  const [coinData, setCoinData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.coinstats.app/public/v1/coins/${coinType}?currency=USD`
      );
      setCoinData(response.data.coin);
      setTableVisible(true);
    } catch (error) {
      console.error(error);
      setCoinData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    handleSubmit({ preventDefault: () => {} });
  }, []);

  return (
    <div className="container">
      <h1 className="text-center mt-2">Crypto Tracker</h1>
      <h4 className="text-center mt-2">By Sidak Bhatia</h4>
      <div className="col-12 form-group">
        <form onSubmit={handleSubmit} id="searchForm">
          <div className="form-row">
            <div className="col-12 form-group text-center">
              <label htmlFor="coin">
                <span style={{ fontWeight: 700 }}>Coin type</span>
              </label>
              <select
                className="form-control"
                name="coinType"
                id="coin"
                value={coinType}
                onChange={(e) => setCoinType(e.target.value)}
              >
                <option value="">Select coin type</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="dogecoin">Dogecoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="polkadot">Polkadot</option>
                <option value="tether">Tether</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Get Price
          </button>
        </form>
      </div>
      {tableVisible && (
        <div id="result" style={{ marginTop: "100px" }}>
          <table
            className="p-4 table table-bordered table-striped"
            id="resTable"
          >
            <tbody>
              <tr className="bg-primary">
                <td className="text-center">Property</td>
                <td className="text-center">Value</td>
              </tr>
              <tr>
                <td>{coinData?.name || "N/A"}</td>
                <td
                  className={
                    coinData?.priceChange1d < 0 ? "text-danger" : "text-success"
                  }
                >
                  <span style={{ fontSize: "1.3em" }}>
                    {coinData?.price || "N/A"}
                  </span>{" "}
                  USD
                </td>
              </tr>
              <tr>
                <td>Volume (24hrs)</td>
                <td>{coinData?.volume || "N/A"}</td>
              </tr>
              <tr>
                <td>Change (24hrs)</td>
                <td
                  className={
                    coinData?.priceChange1d < 0 ? "text-danger" : "text-success"
                  }
                >
                  {coinData?.priceChange1d || "N/A"} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CryptoTracker;
