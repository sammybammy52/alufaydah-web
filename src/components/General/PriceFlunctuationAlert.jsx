import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { MdWarning } from "react-icons/md";

const PriceFlunctuationAlert = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody pb={6}>
            <div className=" pt-10">
              <div>
                <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary bg-opacity-20">
                  <MdWarning size={32} className="text-primary" />
                </div>
                <div class="mt-3 text-center sm:mt-5 lg:max-w-[500px] mx-auto">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Important Notice
                  </h3>
                  <div class="mt-2">
                    <p class="max-md:text-sm text-gray-500">
                      Dear esteemed customers,
                    </p>

                    <p className="text-gray-500 max-md:text-sm ">
                      in light of the ongoing fluctuations in market prices,
                      there is a possibility that the prices of our products may
                      be adjusted based on demand.
                    </p>
                    <p className="text-primary">
                      Thanks for your usual coorperation
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-6">
                <button
                  class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-3 bg-primary text-base font-medium text-white hover:scale-95 transition-all duration-300 focus:outline-none sm:text-sm"
                  onClick={onClose}
                >
                  OK, I understand
                </button>
              </div>
            </div>
          </ModalBody>

          {/* <ModalFooter>
            <Button
              color="#fff"
              backgroundColor="#206a24"
              _hover={{ backgroundColot: "#206a24", opacity: 0.7 }}
              mr={3}
              onClick={onClose}
            >
              I understand
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PriceFlunctuationAlert;
