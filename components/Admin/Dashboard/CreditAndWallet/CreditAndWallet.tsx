'use client'

import { walletData } from "@/utils/walletData"
import Menus from "../Menus/Menus"
import { IoArrowDownCircleOutline, IoArrowUpCircleOutline } from "react-icons/io5"
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";



import { useRouter } from "next/navigation";
import { useSnackbar } from "@/context/snackbar_context";
import { useUserContext } from "@/context/user_context";
import Cookies from "js-cookie";
import moment from "moment";



export default function CreditAndWallet() {

    // here will be wallet data from api. for now i using demo from walletData.ts located in util folder


    // pagination for wallet data
    // Inside the component
    const [currentPage, setCurrentPage] = useState(1);
    const transactionsPerPage = 5; // Set the number of transactions per page

    
       // BACKEND INTEGRATION
  const {
    creditAndWallet,
    verifyAdmin,
    generateInvoice
  }: any = useUserContext();
  const [loading2, setLoading2]: any = useState(true);
  let [allData, setAllData]: any = useState([]);
  let [allFilterData, setAllFilterData]: any = useState([]);
  const { generateSnackbar }: any = useSnackbar();
  let router = useRouter();
  let [totalUsers, setTotalUsers] = useState(0);




  async function getData() {
    setLoading2(true);
    try {
      let res = await creditAndWallet();
      if (res?.status === 200 || res?.data?.status === "success") {
        setAllData(res?.data?.data.reverse());
        
    const indexOfLastTransaction = currentPage * res?.data?.data?.length;
    const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
    const currentTransactions = res?.data?.data?.slice(0, 5);
    setAllFilterData(currentTransactions);

        setLoading2(false);
      } else {
        generateSnackbar(
          res?.response?.data?.message ||
            "Some error occurred, Please Try Again.",
          "error"
        );
      }
    } catch (e) {
      generateSnackbar("Some error occurred, Please Try Again.", "error");
    }
  }

  useEffect(() => {
    async function verify() {
      try {
        setLoading2(true);
        let adminToken: any = Cookies.get("adminToken");

        if (adminToken !== undefined) {
          let res: any = await verifyAdmin({ adminToken });
          if (
            res?.status === 200 ||
            res?.data?.status === "success" ||
            res?.data?.data?.verify === true
          ) { 
            if(res?.data?.data?.status === "system" || res?.data?.data?.status === "user" ){
            getData();
            }
            else{
                router.push("/admin");
            }
          } else {
            router.push("/admin-login");
          }
        } else {
          router.push("/admin-login");
        }
      } catch (e) {
        // console.log(e);
        generateSnackbar("Something went wrong, please Try Again.", "error");
      }
    }
    verify();
  }, []);


    // Handle page change
    function handlePageChange(pageNumber: number) {
        setCurrentPage(pageNumber);
        const indexOfLastTransaction = pageNumber * transactionsPerPage;
        const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
        const currentTransactions = allData.slice(indexOfFirstTransaction, indexOfLastTransaction);
        setAllFilterData(currentTransactions);
      }



    async function handleInvoiceGeneration(sessionId){
        try{
           let res : any = await generateInvoice({
            sessionId
           });
           if(res?.status !== 400 && res?.data?.status === "success"){
            window.open(res?.data?.hostedInvoiceUrl, '_blank')
           }
           else{
            generateSnackbar(res?.response?.data?.message || "Some error Occur, Please Try Again.", "error")
           }
        }
        catch(e){
            // console.log(e);
            generateSnackbar("Some error Occur, Please Try Again.", "error")
        }
    }


    return (
        <>
        
        {loading2 ? (
        <div className="w-[100%] h-screen flex justify-center items-center">
          <div className="loader m-auto" />
        </div>
      ) : (
        <>
        <div className="w-full 2xl:container 2xl:mx-auto h-auto lg:h-screen overflow-hidden flex-col lg:flex-row flex bg-slate-100">
            <div className="w-full lg:w-[180px] xl:w-[256px]">
                <Menus />
            </div>
            <div className="w-auto flex-grow px-3 py-2 overflow-y-scroll relative hiddenScroll">

                {/* heading of the users dashboard */}
                <h4 className="text-[20px] font-bold">Wallet</h4>
                <div className="h-[1px] w-full bg-black mt-5"></div>

                {/* header */}
                <div className="flex justify-between items-center pt-5">
                    <h4 className="font-bold text-[20px] text-[#343C6A]">Recent Transaction</h4>
                </div>

                <ul className="border-b border-black/20 w-full pt-8">
                    <li className="text-[15px] font-semibold px-3 py-1 border-b-[3px] border-[#FFBE00] w-[145px] flex items-center justify-center">All Transaction</li>
                </ul>

                {/* table */}

                <div className="w-full pt-5">
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded-xl">
                            <thead className="py-2 border-b border-black/10">
                                <tr>
                                    <th className="p-3 text-left">Description</th>
                                    <th className="p-3 text-left">Transaction ID</th>
                                    {/* <th className="p-3 text-left">Method</th> */}
                                    <th className="p-3 text-left">Date</th>
                                    <th className="p-3 text-left">Amount</th>
                                    <th className="p-3 text-left">Receipt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allFilterData?.map((data, i) => (
                                    <tr key={i} className="border-b border-black/10">
                                        <td className="p-0">
                                            {
                                                data?.transactionType == "credit" ? <div className="px-3 flex gap-2 items-center">
                                                    <IoArrowUpCircleOutline className="size-[30px] text-[#FFBE00]" />
                                                    <p className="text-[15px] capitalize">{data?.des}</p>
                                                </div> : data?.transactionType == "debit"  && <div className="px-3 flex gap-2 items-center">
                                                    <IoArrowDownCircleOutline className="size-[30px] text-[#FFBE00]" />
                                                    <p className="text-[15px] capitalize">{data?.des}</p>
                                                </div>
                                            }
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[15px] font-semibold">{data?.transactionId.slice(0,20)}...</p>
                                        </td>
                                        {/* <td className="p-4">
                                            <p className="text-gray-500 text-[15px] capitalize">{data?.method}</p>
                                        </td> */}
                                        <td className="p-4 text-[15px] capitalize">{moment(data?.transactionTimeStamp).format('DD MMM, hh:mm A')}</td>
                                        <td className="p-4 text-[15px] capitalize">{
                                            data?.transactionType == "credit"  ? <div className="px-3">
                                                <p className={`text-[15px] capitalize text-[#16DBAA] font-semibold`}>+${data?.transactionAmount}</p>
                                            </div> : data?.transactionType == "debit" && <div className="px-3">
                                                <p className="text-[15px] capitalize text-[#FE5C73] font-semibold">-${data?.transactionAmount}</p>
                                            </div>
                                        }</td>
                                        <td className="p-4">
                                            {/* this button will be connected with backend for download receipt */}
                                            <button className="bg-transparent border border-[#123288] px-7 py-2 text-[#123288] font-semibold rounded-[20px]" onClick={()=>{handleInvoiceGeneration(data?.transactionId)}}>Download</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination controls */}
                <div className="flex justify-end items-center py-5">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md font-semibold flex items-center ${currentPage === 1 ? 'opacity-50' : 'opacity-100 text-[#07242B]'}`}
                    >
                        <IoIosArrowBack className="size-[20px] text-black" /> Previous
                    </button>

                    <div className="flex items-center gap-2">
                        {Array.from({ length: Math.ceil(allData.length / transactionsPerPage) }, (_, number) => (
                            <button
                                key={number + 1}
                                onClick={() => handlePageChange(number + 1)}
                                className={`px-[15px] py-[5px] font-semibold rounded-md ${currentPage === number + 1 ? 'bg-[#07242B] text-white' : 'bg-transparent'}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() =>  handlePageChange(currentPage + 1)}
                        disabled={currentPage === Math.ceil(walletData.length / transactionsPerPage)}
                        className={`px-4 py-2 rounded-md font-semibold flex items-center ${currentPage === Math.ceil(walletData.length / transactionsPerPage) ? 'opacity-50' : 'opacity-100 text-[#07242B]'}`}
                    >
                        Next <IoIosArrowForward className="size-[20px] text-black" />
                    </button>
                </div>
            </div>
        </div>
        </>
      )
    }
        </>
    )
}
