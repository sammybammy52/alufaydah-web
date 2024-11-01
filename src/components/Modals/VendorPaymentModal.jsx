import { useState } from "react";
import { X, Store, CreditCard, CheckCircle } from "lucide-react";
import Fade from "react-reveal/Fade";

export default function VendorPaymentModal({ isOpen, onClose, handleClick }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Fade bottom duration={300}>
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Store className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Own Your Storefront
                  </h3>
                  <p className="text-gray-600 mb-6">
                    For a one-time payment of{" "}
                    <span className="font-semibold text-primary">
                      NGN 10,000
                    </span>
                    , you can own your storefront on our platform and unlock a
                    world of opportunities.
                  </p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">Lifetime ownership</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        Customizable storefront
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        Access to premium features
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-gray-700">
                        24/7 customer support
                      </span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      onClick={() => {
                        handleClick()
                      }}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <CreditCard className="mr-2 h-5 w-5" />
                      Proceed to Payment
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    By proceeding, you agree to our Terms of Service and Privacy
                    Policy.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      )}
    </>
  );
}
