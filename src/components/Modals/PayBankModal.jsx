import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
import CopyUrlButton from '../General/CopyUrlButton';
import { useDataContext } from '../../context/DataContext';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

const PayBankModal = ({ isOpen, onClose, data }) => {
    const acc_no = "0124295120";
    const { postRequest } = useDataContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async() => {
        setLoading(true);
        const result = await postRequest(`make-manual-payment`, data);
        if (result.status === 'success') {
            navigate(`/thank-you/${result?.data?.id}`);
        }else{
            toast.error("Failed to make request, please try again.");
        }
        setLoading(false);
    }
  return (
    <>
   {
    loading && <Loading/>
   } 
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />
    <ModalContent >
      <ModalHeader className={`text-tetiary`}>
        Pay to Bank
      </ModalHeader>
      <ModalCloseButton className="text-red-600" />
      <ModalBody>
        <div action="" >

            <div>
                <h1 className='mb-2'><span className='font-semibold'>Bank:</span>Wema Bank</h1>
              z<h1 className='mb-2'><span className='font-semibold'>Name:</span>Al-Kanz The Treasure SUTIB-PALMS Academy</h1>
            </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="query"
              value={acc_no}
              readOnly={true}
              className=" rounded px-4 py-2 w-full bg-gray-100"
            />
            <CopyUrlButton customDescription={"Copied Successfully"} url={acc_no}/>
          </div>

          <div>
            <button onClick={handleSubmit} className='bg-primary text-white py-2 w-full rounded-full mt-4'>I have Paid!</button>
          </div>

          <p className="mt-4 text-xs text-gray-600"><span className="font-semibold">NOTE:</span> After you make your payment you can reach out to us qspfreview@gmail.com to confirm your payment and then book(s) will be added to your digital library</p>

         
        </div>
      </ModalBody>

      <ModalFooter></ModalFooter>
    </ModalContent>
  </Modal>
    </>
  )
}

export default PayBankModal