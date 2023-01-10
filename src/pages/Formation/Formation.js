import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Player from "../../components/Player/Player";
import Draggable from "react-draggable";
import { Menu, Tab } from "@headlessui/react";
import { CompactPicker } from "react-color";
import TabsButton from "../../components/Tabs/TabsButton";
import Button from "../../components/Button";
import { defaultOffset, positionDefault } from "../../utils/DefaultPos";

const Formation = () => {
  // eslint-disable-next-line no-unused-vars
  const [positionPlayer, setPositionPlayer] = useState([]);
  const [bodyColor, setBodyColor] = useState(`#D33115`);
  const [armColor, setArmColor] = useState(`#FCDC00`);

  const handleAmountPlayer = (value) => {
    const pos = defaultOffset;
    let newArr = [];
    pos.forEach((item, i) => {
      if (value >= i) {
        newArr = [
          ...newArr,
          {
            id: i + 1,
            x: item.x,
            y: item.y,
            name: null,
          },
        ];
      }
    });
    setPositionPlayer(newArr);
  };

  useEffect(() => {
    setPositionPlayer(positionDefault);
  }, []);
  return (
    <>
      <section className="w-full my-[2rem]">
        <Container>
          <div className="grid gap-[1.2rem] md:grid-cols-3 justify-center border bg-white">
            <div className="w-[350px] h-[470px] field relative">
              {positionPlayer?.map((item, i) => (
                <Draggable
                  defaultPosition={{ x: item.x, y: item.y }}
                  bounds={"parent"}
                  key={i}
                >
                  <div className="absolute cursor-move">
                    <Player
                      color={i + 1 === 1 && "#FFBF00"}
                      bodyColor={bodyColor}
                      armColor={armColor}
                    />
                    <p
                      className={`absolute inset-0 flex justify-center items-center text-md font-bold ${
                        i + 1 === 1 ? "text-black" : "text-white"
                      }`}
                    >
                      {i + 1}
                    </p>
                    <p
                      className={`text-sm absolute bottom-0 right-1/2 translate-x-1/2 translate-y-[20px] text-white`}
                    >
                      {item.player || "Player"}
                    </p>
                  </div>
                </Draggable>
              ))}
            </div>
            {/* Option */}
            <div className="w-full md:p-2 px-5 flex flex-col gap-4 overflow-y-scroll h-[470px]">
              <Tab.Group as="div" className="md:order-one order-last">
                <Tab.List className="flex gap-[2rem]">
                  <TabsButton name="Apperance" />
                  <TabsButton name="Player" />
                </Tab.List>
                <Tab.Panels className="mt-[2rem]">
                  <Tab.Panel>
                    <div className="flex flex-col gap-2 mb-5">
                      <label htmlFor="" className="font-semibold">
                        Team Name
                      </label>
                      <input
                        type="text"
                        className="ring-[1px] ring-black/50  py-2 px-4 outline-none rounded-md"
                        placeholder="Team"
                      />
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                      <label htmlFor="" className="font-semibold">
                        Formation
                      </label>
                      <select
                        name=""
                        id=""
                        className="ring-[1px] ring-black/50  py-2 px-4 outline-none rounded-md"
                      >
                        <option value="" defaultValue={"select"}>
                          Custom
                        </option>
                        <option value="">4-4-3</option>
                        <option value="">4-3-3</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2 mb-5">
                      <label htmlFor="" className="font-semibold">
                        Amount player
                      </label>
                      <select
                        name=""
                        id=""
                        className="ring-[1px] ring-black/50  py-2 px-4 outline-none rounded-md"
                        onChange={(e) => handleAmountPlayer(e.target.value)}
                      >
                        {Array(11)
                          .fill(null)
                          .map((item, i) => (
                            <option
                              value={i}
                              defaultValue={i + 1 === 11 && "selected"}
                              key={i}
                            >
                              {i + 1}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="flex justify-between items-center gap-2 mb-5">
                      <label htmlFor="" className="font-semibold">
                        Color
                      </label>
                      <div className="flex flex-col gap-5">
                        <Menu as="div" className="relative flex">
                          <Menu.Button
                            className={`w-[120px] h-6 border-[2px] border-black`}
                            style={{ backgroundColor: `${bodyColor}` }}
                          ></Menu.Button>
                          <Menu.Items className="absolute -translate-x-1/2 top-0 translate-y-[30%] z-[2]">
                            <Menu.Item>
                              <CompactPicker
                                onChange={(color, e) => setBodyColor(color.hex)}
                              />
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                        <Menu as="div" className="relative flex">
                          <Menu.Button
                            className={`w-[120px] h-6 border-[2px] border-black`}
                            style={{ backgroundColor: `${armColor}` }}
                          ></Menu.Button>
                          <Menu.Items className="absolute -translate-x-1/2 top-0 translate-y-[30%] z-[2]">
                            <Menu.Item>
                              <CompactPicker
                                onChange={(colors, e) =>
                                  setArmColor(colors.hex)
                                }
                              />
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </div>
                    </div>
                    <div className="flex gap-3 md:justify-start justify-center md:order-last order-1">
                      <Button className="bg-slate-900">Save as image</Button>
                      <Button className="bg-slate-900">Export Link</Button>
                    </div>
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
            <div className="w-full md:p-2 px-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                quisquam earum recusandae atque pariatur magni quam
                reprehenderit tempore ab corporis, excepturi quidem nulla
                possimus ea eum placeat porro optio praesentium.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Formation;
