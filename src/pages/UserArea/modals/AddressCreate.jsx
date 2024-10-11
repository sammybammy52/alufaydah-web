import { useState, useEffect} from "react";
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
} from "@chakra-ui/react";
import { useAuthContext } from '../../../context/AuthContext';
import { useDataContext } from "../../../context/DataContext";
import { toast } from "react-toastify";
const AddressCreate = ({ isOpen, onOpen, onClose }) => {
  const { user } = useAuthContext();
  const { postRequest, getRequest } = useDataContext()
  const [address, setaddress] = useState("");
  const [additionalInfo, setadditionalInfo] = useState("");
  const [state, setstate] = useState("");
  const [lga, setlga] = useState("");
  const [phone1, setphone1] = useState("");
  const [phone2, setphone2] = useState("");

  //getting data for the select boxes
  const [stateList, setStateList] = useState(null);
  const [lgaHolder, setLgaHolder] = useState(null)
  const [lgaList, setLgaList] = useState(null);
  useEffect(() => {
   const getStatesLga = async()=>{
    const result = await getRequest('client/state-and-lga');
    if (result) {
      setStateList(result.states);
      setLgaHolder(result.lga);

    }
   }

   getStatesLga();
  }, []);

  useEffect(() => {
    if (state!= "") {
      const selectedLga = lgaHolder.filter((i)=> {
        return i.state_id == state
      })
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

    const toastKey = toast.loading("Adding Address");

    const result = await postRequest('client/add-address', {
      address,
      additional_info: additionalInfo,
      state_id: state,
      lga_id: lga,
      phone_1: phone1,
      phone_2: phone2,
      customer_id: user.id,
    })

    if (result) {
      toast.update(toastKey, {
        render: "Address Successfully stored",
        type: "success",
        isLoading: false,
        autoClose: 5000,
      });
     window.location.reload();
    }
    else{
      toast.update(toastKey, {
        render: "Error Saving Address",
        type: "error",
        isLoading: false,
        autoClose: 5000,
      });
    }

    
  }

  

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new address</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div className="form-div flex flex-col gap-3">
            <FormControl>
              <FormLabel>Delivery Address</FormLabel>
              <Input type="text" value={address} onChange={(e) => setaddress(e.target.value)}/>
            </FormControl>

            <FormControl>
              <FormLabel>Additional Information</FormLabel>
              <Input type="text" value={additionalInfo} onChange={(e) => setadditionalInfo(e.target.value)}/>
            </FormControl>

            <FormControl>
              <FormLabel>State</FormLabel>
              <Select placeholder="Select State" value={state} onChange={(e) => setstate(e.target.value)}>
                {
                  stateList && stateList.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>LGA</FormLabel>
              <Select placeholder={lgaList ? "Select Lga" : "Select State First"} value={lga} onChange={(e) => setlga(e.target.value)}>
                {
                  lgaList && lgaList.map((i) => (
                    <option value={i.id}>{i.name}</option>
                  ))
                }
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Phone number 1</FormLabel>
              <NumberInput >
                <NumberInputField value={phone1} onChange={(e) => setphone1(e.target.value)}/>
                
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Phone number 2</FormLabel>
              <NumberInput >
                <NumberInputField value={phone2} onChange={(e) => setphone2(e.target.value)}/>
                
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
  );
};

export default AddressCreate;
