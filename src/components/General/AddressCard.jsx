import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  NumberInputField,
  NumberInput,
  useDisclosure,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { useDataContext } from "../../context/DataContext";
const AddressCard = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthContext();
  const { postRequest, getRequest } = useDataContext();
  const [address, setaddress] = useState(data?.address);
  const [additionalInfo, setadditionalInfo] = useState(data?.additional_info);
  const [state, setstate] = useState("");
  const [lga, setlga] = useState("");
  const [phone1, setphone1] = useState(data?.phone_1);
  const [phone2, setphone2] = useState(data?.phone_2);

  //getting data for the select boxes
  const [stateList, setStateList] = useState(null);
  const [lgaHolder, setLgaHolder] = useState(null);
  const [lgaList, setLgaList] = useState(null);
  useEffect(() => {
    const getStatesLga = async () => {
      const result = await getRequest("client/state-and-lga");
      if (result) {
        setStateList(result.states);
        setLgaHolder(result.lga);
      }
    };

    getStatesLga();
  }, []);

  useEffect(() => {
    if (state != "") {
      const selectedLga = lgaHolder.filter((i) => {
        return i.state_id == state;
      });
      setLgaList(selectedLga);
    }
  }, [state]);

  const validate = () => {
    if (
      address != "" &&
      additionalInfo != "" &&
      state != "" &&
      lga != "" &&
      phone1 != "" &&
      phone2 != ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async() => {
    const isFilled = validate();

    if (!isFilled) {
      toast.error("Please Fill All Fields");
      return;
    }

    const toastKey = toast.loading("Modifying Address");

    const result = await postRequest("client/edit-address", {
      id: data?.id,
      address,
      additional_info: additionalInfo,
      state_id: state,
      lga_id: lga,
      phone_1: phone1,
      phone_2: phone2,
      customer_id: user.id,
    });

    if (result) {
      toast.update(toastKey, {
        render: "Address Successfully Modified",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      window.location.reload();
    } else {
      toast.update(toastKey, {
        render: "Error Modifying Address",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleDelete = async (id) => {
    const toastKey = toast.loading("Deleting Address");
    const result = await getRequest(`client/delete-address/${id}`);
    if (result) {
      toast.update(toastKey, {
        render: "Address Successfully Deleted",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      window.location.reload();
    } else {
      toast.update(toastKey, {
        render: "Error Deleting Address",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };

  const handleSetDefault = async (id) => {
    const toastKey = toast.loading("Setting");
    const result = await postRequest(`client/set-default-address`, {
        customer_id: user.id,
        address_id: id
    });
    if (result) {
      toast.update(toastKey, {
        render: "Default Set",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
      window.location.reload();
    } else {
      toast.update(toastKey, {
        render: "Failed to set",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }
  };
  

  return (
    <>
      <div className=" border-[1px] border-[#206a24] rounded p-4 mb-3">
        <h3 className=" font-semibold">{data?.address}</h3>
        <div className="flex gap-2">
          <p className="text-sm">{data?.state_name},</p>
          <p className="text-sm">{data?.lga_name}</p>
        </div>
        <div className="flex gap-2">
          <p className="text-sm font-semibold">{data?.phone_1}</p>
          <p className="text-sm font-semibold">{data?.phone_2}</p>
        </div>

        <div className="flex gap-4 pb-2">
          <FaEdit size={24} onClick={onOpen} /> <AiFillDelete size={24} onClick={() => handleDelete(data?.id)} className={data?.default_address == 0 ? '' : 'hidden'}/>
        </div>
       {
        data?.default_address == 0 ? <>
         <button className="w-full flex justify-center bg-[#c20959e1] py-2 rounded" onClick={() => handleSetDefault(data?.id)}>
          <p className="text-white">Set Default Address</p>
        </button>
        </> :  <button className="w-full flex justify-center border-[1px] border-[#c20959e1] py-2 rounded">
          <p className="">Selected Address</p>
        </button>
       }
      </div>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div className="form-div flex flex-col gap-3">
              <FormControl>
                <FormLabel>Delivery Address</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Additional Information</FormLabel>
                <Input
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setadditionalInfo(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>State</FormLabel>
                <Select
                  placeholder="Select State"
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                >
                  {stateList &&
                    stateList.map((i) => (
                      <option value={i.id}>{i.name}</option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>LGA</FormLabel>
                <Select
                  placeholder={lgaList ? "Select Lga" : "Select State First"}
                  value={lga}
                  onChange={(e) => setlga(e.target.value)}
                >
                  {lgaList &&
                    lgaList.map((i) => <option value={i.id}>{i.name}</option>)}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Phone number 1</FormLabel>
                <NumberInput>
                  <Input
                    type="number"
                    value={phone1}
                    onChange={(e) => setphone1(e.target.value)}
                  />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Phone number 2</FormLabel>
                <NumberInput>
                  <Input
                    type="number"
                    value={phone2}
                    onChange={(e) => setphone2(e.target.value)}
                  />
                </NumberInput>
              </FormControl>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="#fff"
              backgroundColor="#206a24"
              _hover={{ backgroundColot: "#206a24", opacity: 0.7 }}
              mr={3}
              onClick={handleSubmit}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressCard;
