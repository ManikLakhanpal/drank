import { useState, useEffect } from "react";
import { dbank_backend } from "../../declarations/dbank_backend";

function App() {
  const [balance, setBalance] = useState(0);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  useEffect(() => {
    async function fetchBalance() {
      setBalance(await dbank_backend.checkBalance());
    }
    fetchBalance();
  }, []);

  const handleTopUpChange = (e) => setTopUpAmount(e.target.value);
  const handleWithdrawChange = (e) => setWithdrawAmount(e.target.value);

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    if (topUpAmount) {
        await dbank_backend.topUp(parseFloat(topUpAmount));
    }

    if (withdrawAmount) {
        await dbank_backend.withdrawlAmount(parseFloat(withdrawAmount));
    }

    setBalance(await dbank_backend.checkBalance());
    setTopUpAmount("");
    setWithdrawAmount("");

  }

  return (
    <div className="container">
      <img src="dbank_logo.png" alt="DBank logo" width="100" />
      <h1>
        Current Balance: $<span id="value">{balance}</span>
      </h1>
      <div className="divider"></div>
      <form onSubmit={handelSubmit}>
        <h2>Amount to Top Up</h2>
        <input
          id="input-amount"
          type="number"
          step="0.01"
          name="topUp"
          value={topUpAmount}
          onChange={handleTopUpChange}
        />
        <h2>Amount to Withdraw</h2>
        <input
          id="withdrawal-amount"
          type="number"
          name="withdraw"
          step="0.01"
          value={withdrawAmount}
          onChange={handleWithdrawChange}
        />
        <input id="submit-btn" type="submit" value="Finalise Transaction"/>
      </form>
    </div>
  );
}

export default App;
