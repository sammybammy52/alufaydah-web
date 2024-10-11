import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { convertToEmbedURL } from "../../utils/Helpers";

const VideoModal = ({ isOpen, onClose,storeName, storeVideo }) => {
  return (
    <Modal  isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW={"5xl"}>
        <ModalHeader className={`text-tetiary`}>{storeName}</ModalHeader>
        <ModalCloseButton className="text-red-600" />
        <ModalBody >
          <div action="">
            <div className="flex justify-center">
              <iframe
                className="w-full h-[400px]"
                src={convertToEmbedURL(storeVideo) || null}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowfullscreen={true}
              ></iframe>
            </div>
          </div>
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
