import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import Player from "../../components/Player/Player";
import Draggable from "react-draggable";
import { Menu, Tab } from "@headlessui/react";
import { CompactPicker } from "react-color";
import TabsButton from "../../components/Tabs/TabsButton";
import Button from "../../components/Button";
import { defaultOffset, positionDefault } from "../../utils/DefaultPos";
import ColGroup from "../../components/Form/ColGroup";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import RowGroup from "../../components/Form/RowGroup";
import ReactSelect from "react-select";
import { IconOption } from "../../utils/Options";
import Icons from "../../components/Icons";

const Formation = () => {
  // eslint-disable-next-line no-unused-vars
  const [positionPlayer, setPositionPlayer] = useState([]);
  const [bodyColor, setBodyColor] = useState(`#D33115`);
  const [armColor, setArmColor] = useState(`#FCDC00`);
  const [playerIcon, setPlayerIcon] = useState(null);
  const [fontColor, setFontColor] = useState("#FFFFFF");

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

  const handleChangePlayer = (e, id, attr) => {
    const player = [...positionPlayer];
    const findPlayer = player.find((item) => item.id === id);
    if (attr === "icon") {
      findPlayer.icon = e.value;
    } else {
      if (e.target.name === "name") {
        findPlayer.name = e.target.value;
      }
      if (e.target.name === "nomor") {
        findPlayer.id = e.target.value;
      }
    }

    setPositionPlayer(player);
  };

  useEffect(() => {
    setPositionPlayer(positionDefault);
  }, []);
  useEffect(() => {
    console.log(positionPlayer);
  }, [positionPlayer]);
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
                    {playerIcon ? (
                      playerIcon.map((item) => (
                        <Player
                          color={i + 1 === 1 && "#FFBF00"}
                          bodyColor={bodyColor}
                          armColor={armColor}
                          iconType={item.name}
                        />
                      ))
                    ) : (
                      <Player
                        color={i + 1 === 1 && "#FFBF00"}
                        bodyColor={bodyColor}
                        armColor={armColor}
                        iconType={"jersey"}
                      />
                    )}

                    <p
                      className={`absolute inset-0 flex justify-center items-center text-md font-bold`}
                      style={{ color: fontColor }}
                    >
                      {item.id}
                    </p>
                    <p
                      className={`text-sm absolute bottom-0 right-1/2 translate-x-1/2 translate-y-full w-[100px] text-center text-white`}
                    >
                      {item.name || "Player"}
                    </p>
                    {item.icon && (
                      <div className="text-sm absolute top-0 right-0 translate-x-1/2 translate-y-full">
                        <Icons src={item.icon} width={20} />
                      </div>
                    )}
                  </div>
                </Draggable>
              ))}
            </div>
            {/* Option */}
            <div className="relative">
              <div className="w-full md:py-2 md:pr-5 md:px-1 px-4 flex flex-col gap-4 overflow-y-scroll h-[470px]">
                <div className="flex gap-3 md:justify-start justify-center order-1 mt-3">
                  <Button className="bg-slate-900">Save as image</Button>
                  <Button className="bg-slate-900">Export Link</Button>
                </div>
                <Tab.Group as="div" className="md:order-one order-last">
                  <Tab.List className="flex gap-[2rem]">
                    <TabsButton>Apperance</TabsButton>
                    <TabsButton>Player</TabsButton>
                  </Tab.List>
                  {/* apperance */}
                  <Tab.Panels className="mt-[1rem]">
                    <Tab.Panel>
                      <ColGroup>
                        <Label>Team Name</Label>
                        <Input
                          name="team"
                          placeholder="team name"
                          type="text"
                          padding="py-[4px] px-4"
                        />
                      </ColGroup>
                      <ColGroup>
                        <Label>Formation</Label>
                        <ReactSelect
                          options={[{ label: "4-4-3", value: "4-4-3" }]}
                        />
                      </ColGroup>
                      <ColGroup>
                        <Label>Amount Player</Label>
                        <ReactSelect
                          onChange={(e) => handleAmountPlayer(e.value)}
                          defaultValue={{ label: 11 }}
                          options={Array(11)
                            .fill(null)
                            .map((item, i) => ({
                              value: i + 1,
                              label: i + 1,
                            }))}
                        />
                      </ColGroup>
                      <ColGroup>
                        <Label>Player icon</Label>
                        <ReactSelect
                          defaultValue={{
                            label: (
                              <Player
                                bodyColor={bodyColor}
                                armColor={armColor}
                                width={"20px"}
                                iconType="jersey"
                              />
                            ),
                          }}
                          onChange={(e) => {
                            setPlayerIcon([{ name: e.value }]);
                          }}
                          options={[
                            {
                              label: (
                                <Player
                                  bodyColor={bodyColor}
                                  armColor={armColor}
                                  iconType="circle"
                                  height={"20px"}
                                  width={"20px"}
                                />
                              ),
                              value: "circle",
                            },
                            {
                              label: (
                                <Player
                                  bodyColor={bodyColor}
                                  armColor={armColor}
                                  height={"20px"}
                                  width={"20px"}
                                  iconType="jersey"
                                />
                              ),
                              value: "jersey",
                            },
                          ]}
                        />
                      </ColGroup>
                      <div className="flex justify-between items-center gap-2 mb-5">
                        <Label>Color</Label>
                        <ColGroup>
                          <Menu as="div" className="relative flex">
                            <Menu.Button
                              className={`w-[120px] h-6 border-[2px] border-black`}
                              style={{ backgroundColor: `${bodyColor}` }}
                            ></Menu.Button>
                            <Menu.Items className="absolute -translate-x-1/2 top-0 translate-y-[30%] z-[999]">
                              <Menu.Item>
                                <CompactPicker
                                  className="z-[99]"
                                  onChange={(color, e) =>
                                    setBodyColor(color.hex)
                                  }
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
                          <Menu as="div" className="relative flex">
                            <Menu.Button
                              className={`w-[120px] h-6 border-[2px] border-black`}
                              style={{ backgroundColor: `${fontColor}` }}
                            ></Menu.Button>
                            <Menu.Items className="absolute -translate-x-1/2 top-0 translate-y-[30%] z-[2]">
                              <Menu.Item>
                                <CompactPicker
                                  onChange={(colors, e) =>
                                    setFontColor(colors.hex)
                                  }
                                />
                              </Menu.Item>
                            </Menu.Items>
                          </Menu>
                        </ColGroup>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>

                  {/* Player */}
                  <Tab.Panels className="mt-[2rem]">
                    <Tab.Panel>
                      <RowGroup>
                        <Label className="w-[30px]">No</Label>
                        <Label className="w-8/12">Player</Label>
                        <Label className="flex-2">Icon</Label>
                      </RowGroup>
                      {positionPlayer?.map((item, i) => (
                        <RowGroup key={i} className="mb-5">
                          <Input
                            className="w-[25px] text-center"
                            defaultValue={item.id}
                            name="nomor"
                            onChange={(e) => handleChangePlayer(e, item.id)}
                          />
                          <Input
                            padding="py-1 px-3"
                            name="name"
                            placeholder={`${
                              item.name ? `${item.name}` : `player#${item.id}`
                            } [ Click to edit ]`}
                            onChange={(e) => handleChangePlayer(e, item.id)}
                          />
                          <ReactSelect
                            options={IconOption}
                            name="icon"
                            onChange={(e, type) => {
                              handleChangePlayer(e, item.id, type.name);
                              // console.log(e.value);
                            }}
                          />
                        </RowGroup>
                      ))}
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
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
