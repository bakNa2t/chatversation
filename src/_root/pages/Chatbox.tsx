import React, { useState } from "react";

import { Input } from "@nextui-org/react";

const Chatbox = () => {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 p-4 mb-20">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) =>
          row % 2 === 0 ? (
            <div className="flex justify-end mb-2" key={row}>
              <div className="bg-fuchsia-300 p-2 max-w-72 rounded-lg">
                <h1 className="font-bold text-xl">User name</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Vitae perferendis quibusdam accusamus voluptas quisquam
                  repellendus nostrum cumque necessitatibus totam blanditiis?
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-start mb-2" key={row}>
              <div className="bg-violet-300 p-2 max-w-72 rounded-lg">
                <h1 className="font-bold text-xl">User name</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                  tenetur, sunt asperiores necessitatibus libero voluptas.
                </p>
              </div>
            </div>
          )
        )}
      </div>

      <div className="fixed p-4 bottom-0 left-0 right-0 bg-fuchsia-200">
        <form onSubmit={handleMessageSubmit}>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              label="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbox;
