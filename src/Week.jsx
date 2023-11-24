import React, { useEffect, useState } from 'react'
import http from './http';

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


function Week() {
    const [week, setWeek] = useState(0);
    const [invoices, setInvoices] = useState([]);

    const [invoice, setInvoice] = useState([])
    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false);
    const handleOpen = (id) => {
        if(!open){
            setSelected(id);
            http.GET(`/statistics/invoices/invoice/${id}`)
            .then(items=>{
            setInvoice(items);
            setProducts(items.products)
        })
        }
        setOpen(!open);
    }
    const [selected, setSelected] = useState("")

    useEffect(() =>{
        http.GET("/statistics/week")
        .then((res)=>{
            setWeek(res[0].totalPrice);
        })
        .catch(err=>{
            console.log(err);
        })

        http.GET("/statistics/invoices/week")
        .then(res=>{
            res.reverse();
            setInvoices(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }, [])
  return (
    <>
    <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{selected}</DialogHeader>
        <DialogBody>
          {products.map((p, index) => (
            <React.Fragment key={index}>
                <p>{p.name} X {p.quantity}</p>
                {index !== products.length - 1 && <hr className="my-2 border-white" />}
            </React.Fragment>
           ))}
           <hr className="my-2 border-white" />
        اجمالي الفاتوره: {invoice.totalPrice}
        <hr className="my-2 border-white" />
        جمله الفاتوره: {invoice.netPrice}
        <hr className="my-2 border-white" />
        مكسب الفاتوره: {invoice.profit}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
        <div className="flex justify-center bg-gray-100 py-10 p-14">
      <div className="container mx-auto">
        {/* Card 1 */}
        <div className="w-full sm:w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
            <div className="h-20 bg-red-400 flex items-center justify-between">
                <p className="mr-0 text-white text-lg pl-5">مبيعات الاسبوع</p>
            </div>
            <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
                <p>TOTAL</p>
            </div>
            <p className="py-4 text-3xl ml-5">{week}</p>
        </div>
      </div>
    </div>

<div className="flex justify-center bg-gray-100 py-10 p-5">
  <div className="container mr-5 ml-2 mx-auto bg-white shadow-xl">
    <div className="w-11/12 mx-auto">
      <div className="bg-white my-6">
        <table className="text-left w-full border-collapse"> 
          <thead>
            <tr>
              <th className="py-4 px-6 bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">رقم الفاتوره</th>
              <th className="py-4 px-6 text-center bg-purple-400 font-bold uppercase text-sm text-white border-b border-grey-light">اجمالي</th>
            </tr>
          </thead>
          <tbody>
            {
                invoices.map((invoice)=>{
                    return (
                        <tr className="hover:bg-grey-lighter">
                            <td className="py-4 px-6 border-b border-grey-light" onClick={()=> handleOpen(invoice._id)}>{invoice._id}</td>
                            <td className="py-4 px-6 text-center border-b border-grey-light">
                                {invoice.totalPrice}
                            </td>
                        </tr>
                    )
                })
            }
          </tbody>
        </table>
      </div>
      </div>
        </div>

    

      
    </div>
    </>
  )
}

export default Week