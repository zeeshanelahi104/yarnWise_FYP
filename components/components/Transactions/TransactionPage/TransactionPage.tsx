import Link from "next/link";


const TransactionPage = () => {
  return (
    <div className="transaction-page-wrapper container ml-[100px] pt-[45px]">
      <h1 className="title text-primary-clr">Transactions</h1>
      <ul className="flex gap-[25px] mt-[20px]">
        <li>
          <Link
            href="/transactions/addtransaction"
            className={"hover:border-b-2 hover:border-primary-clr"}
          >
            Add Transaction
          </Link>
        </li>
        <li>
          <Link
            href="/transactions/manage-transactions"
            className={"hover:border-b-2 hover:border-primary-clr"}
          >
            View Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default TransactionPage;
