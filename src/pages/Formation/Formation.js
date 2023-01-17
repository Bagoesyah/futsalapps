import React, { useEffect, useState, useCallback, useRef } from "react";
import Container from "../../components/Container";
import Player from "../../components/Player/Player";
import Draggable from "react-draggable";
import { Menu, Tab } from "@headlessui/react";
import { CompactPicker } from "react-color";
import * as htmlToImage from "html-to-image";
import TabsButton from "../../components/Tabs/TabsButton";
import Button from "../../components/Button";
import ColGroup from "../../components/Form/ColGroup";
import Label from "../../components/Form/Label";
import Input from "../../components/Form/Input";
import RowGroup from "../../components/Form/RowGroup";
import ReactSelect from "react-select";
import { IconOption, formationOption } from "../../utils/Options";
import Icons from "../../components/Icons";
import {
  defaultOffset,
  formation433,
  formation442,
  positionDefault,
} from "../../utils/Position";

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

  const handleFormation = (e) => {
    if (!e.value) return false;
    const dataPlayer = [...positionPlayer];
    if (e.value === "433") {
      formation433.forEach((item, i) => {
        const findPlayer = dataPlayer.find(
          (item, indexPlayer) => indexPlayer === i
        );
        findPlayer.x = item.x;
        findPlayer.y = item.y;
      });
    }
    if (e.value === "442") {
      formation442.forEach((item, i) => {
        const findPlayer = dataPlayer.find(
          (item, indexPlayer) => indexPlayer === i
        );
        findPlayer.x = item.x;
        findPlayer.y = item.y;
      });
    }
    setPositionPlayer(dataPlayer);
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

  const handlePlayerPosition = (id, x, y) => {
    const player = [...positionPlayer];
    const findPlayer = player.find((item) => item.id === id);
    findPlayer.x = x;
    findPlayer.y = y;
    setPositionPlayer(player);
  };

  useEffect(() => {
    setPositionPlayer(positionDefault);
  }, []);
  useEffect(() => {
    console.log(positionPlayer);
  }, [positionPlayer]);

  const refFormation = useRef(null);

  const capture = useCallback(() => {
    if (refFormation.current === null) {
      return;
    }

    htmlToImage
      .toPng(refFormation.current, { cacheBust: true })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "Formation.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refFormation]);
  return (
    <>
      <section className="w-full my-[2rem]">
        <Container>
          <h1 className="text-xl md:text-3xl font-extrabold mb-3">
            Football Formation Maker
          </h1>
          <div className="p-4 h-full gap-[1.2rem] grid md:grid-cols-3 justify-center border bg-white rounded-lg">
            <div className="relative">
              <div className="top-0 flex gap-3 md:justify-start justify-center order-1 mb-3">
                <Button className=" bg-slate-900" onClick={() => capture()}>
                  Save as image
                </Button>
                <Button className=" bg-slate-900">Export Link</Button>
              </div>

              <div
                ref={refFormation}
                className="w-[350px] h-[470px] field top-10"
              >
                {positionPlayer?.map((item, i) => (
                  <Draggable
                    axis="both"
                    position={{ x: item.x, y: item.y }}
                    defaultPosition={{ x: item.x, y: item.y }}
                    bounds={"parent"}
                    onStop={(e, data) =>
                      handlePlayerPosition(item.id, data.x, data.y)
                    }
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
                            key={i}
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
            </div>
            {/* Option */}
            <div className="relative">
              <div className="w-full md:py-2 md:pr-5 md:px-1 px-4 flex flex-col gap-4 overflow-y-scroll h-[520px]">
                <Tab.Group as="div" className="md:order-one order-last">
                  <Tab.List className="flex gap-[2rem]">
                    <TabsButton>Apperance</TabsButton>
                    <TabsButton>Player</TabsButton>
                  </Tab.List>
                  {/* apperance */}
                  <Tab.Panels className="mt-3">
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
                          options={formationOption}
                          onChange={(e) => handleFormation(e)}
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
                              value: i,
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
                      {/* flex justify-between items-center */}
                      <div className="gap-2">
                        <Label>Color</Label>
                        <ColGroup>
                          <Menu as="div" className="relative flex mt-3 gap-2">
                            <Label>Primary:</Label>
                            <Menu.Button
                              className={`w-[40px] h-6 border-2 border-black rounded-md`}
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
                          <Menu as="div" className="relative flex gap-2 ">
                            <Label>Secondary:</Label>
                            <Menu.Button
                              className={`w-[40px] h-6 border-2 border-black rounded-md`}
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
                          <Menu as="div" className="relative flex gap-2 ">
                            <Label>Nomor:</Label>
                            <Menu.Button
                              className={`w-[40px] h-6 border-2 border-black rounded-md`}
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
                  <Tab.Panels className="mt-3">
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
              <h1 className="font-bold text-3xl">
                Cara Membuat Formasi Pemain Football
              </h1>
              <p className="font-semibold leading-8 capitalize">
                <br /> 1. Masukkan nama tim Anda <br />
                2. Pilih formasi Anda bisa buat formasi sendiri atau pilih dari
                formasi yang telah ditentukan sebelumnya, termasuk 4-3-3, 4-4-2,
                4-2-3-1, dll. <br /> 3. Tentukan jumlah pemain regu anda <br />
                4. Pilih jenis tampilan pemain <br /> 5. Pilih warna regu Anda.
                Ada tiga kategori warna: warna primer, warna sekunder dan warna
                nomor. <br /> 6. Mulailah memodifikasi tim Anda! Ubah nama dan
                nomor setiap pemain serta tambah keterangan pemain seperti kartu
                kuning dan merah dengan mengkliknya.
              </p>
            </div>
          </div>
          <div className="text-center text-xs font-bold mt-2">
            <p>Copyright 2023, Football Formation Maker</p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Formation;
