import Sidebar from "@/components/common/Sidebar";
import Header from "@/components/common/Header";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, ConfigProvider, theme } from "antd";
import { ulid } from "ulid";
import toast from "react-hot-toast";
import { NearContext } from "@/wallets/near";
import { BugBountyContract } from "@/config";
import Modal from "@/components/profile/Modal";
import { useInitializeContract } from "@/functions";

const ProfileEntries = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const range = dayjs().subtract(18, "years").format("YYYY-MM-DD");
  const [date, setDate] = React.useState(dayjs(range));
  const [base64String, setBase64String] = useState("");
  const labelRef = React.useRef(null);
  const { wallet, signedAccountId } = React.useContext(NearContext);
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { initContract } = useInitializeContract();

  const onClose = () => {
    setIsOpen(false);
  };

  const onSubmit = async (data: any) => {
    if (base64String.length < 10) {
      toast.error("upload an avatar");
      return;
    }
    const data_ = {
      id_hash: ulid(),
      account_id: signedAccountId,
      username: data.username,
      dob: dayjs(date).valueOf().toString(),
      github: data.github,
      picture: base64String,
    };
    // console.log(data_);
    try {
      setLoading(true);
      // await initContract();
      if (wallet && signedAccountId) {
        const submit = await wallet.callMethod({
          contractId: BugBountyContract,
          method: "create_user",
          args: {
            account_id: signedAccountId,
            username: data.username,
            dob: dayjs(date).valueOf().toString(),
            github_link: data.github,
            image_url: "",
            id_hash: ulid(),
          },
        });
        toast.success("Profile Created Successfully");
        setIsOpen(true);
      }
    } catch (err) {
      toast.error("Error creating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setBase64String(reader.result as any);
        // setImage(URL.createObjectURL(file));
      };

      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
      console.log(base64String);
    }
  };

  React.useEffect(() => {
    // Check if the label reference is set
    if (labelRef.current) {
      // Set the background image
      labelRef.current.style.backgroundImage = `url('${base64String}')`;
    }
  }, [base64String]);

  return (
    <div className="flex">
      <Header />
      <Sidebar />
      <div className="mt-[5rem] mx-[1rem] flex flex-col w-full mb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className={`text-[1rem] text-center mb-6 mt-8`}>
            {" "}
            Update
            <span className="bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
              {" "}
              Profile
            </span>
          </h1>
          <div className="flex mt-4 mx-4 flex-col">
            <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
              Profile Picture
            </p>
            {/* Profile Picture Upload */}
            <div className="flex-col  flex mt-3 rounded-tr-[1.5rem] rounded-br-[1.5rem]">
              <div className="bg-black flex  cursor-pointer items-center h-[8rem] w-full lg:w-[30%] rounded-tl-full rounded-bl-full rounded-tr-[1.5rem] rounded-br-[1.5rem] ">
                <div className="flex cursor-pointer w-fit border-[4px] border-solid border-color-7 rounded-full ">
                  <label
                    htmlFor="image-file"
                    ref={labelRef}
                    className={`relative w-[7rem] h-[7rem] bg-center bg-no-repeat bg-contain flex flex-col items-center justify-center shadow-md rounded-full gap-[15px] select-none cursor-pointer text-white text-sm transition-all duration-1000 hover:text-[#18ac1c] ${
                      base64String.length < 10 && " border-red-700"
                    }`}
                  >
                    Upload Image
                  </label>
                </div>
                <input
                  onChange={handleImageChange}
                  // {...register("picture")}
                  id="image-file"
                  type="file"
                  accept="image/*"
                  className="hidden text-[0.85rem] ml-4 text-white"
                />
                {/* </input> */}
              </div>
            </div>
          </div>
          <div className="mt-8 mb-4 border border-solid border-[#2E3438] w-full" />
          <p className="text-[0.8rem] mt-4 mb-[1rem] font-semibold sm:text-base  bg-gradient-to-r from-linear-1  to-linear-2  text-[transparent] bg-clip-text">
            Account Information
          </p>
          <div className="flex flex-col lg:flex-row gap-8 items-center ">
            <div className="flex flex-col w-full lg:w-[50%]">
              <p
                className={`mb-4 text-sm sm:text-[.85rem] mt-[1.5rem] font-normal text-white `}
              >
                Username
              </p>
              <div
                className={`w-full items-center pr-8 pl-2 h-[2rem]  hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex 
                  ${
                    errors.username
                      ? "border-9 border-red-700"
                      : "border-[#595959]"
                  }`}
              >
                <input
                  className={`border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem] 
`}
                  placeholder="Username"
                  {...register("username", { required: true })}
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[50%]">
              <p className="mb-4 text-sm sm:text-[.85rem] mt-[1.5rem] font-normal text-white">
                Github Link
              </p>
              <div
                className={`w-full items-center pr-8 pl-2 h-[2rem]  hover:border-[#fc923b]  bg-[#141414] border-solid border rounded-[6px] flex ${
                  errors.github ? "border-9 border-red-700" : "border-[#595959]"
                }`}
              >
                <input
                  className="border-none w-full text-white pl-0 focus:outline-none placeholder:text-[0.8rem] focus:ring-0 placeholder:text-[#595959] appearance-none text-[0.9rem] bg-[#141414] py-[.1rem]"
                  placeholder="link to your github"
                  {...register("github", { required: true })}
                  type="text"
                />
              </div>
            </div>
            <div className="flex flex-col w-full lg:w-[50%]">
              <p className="mb-4 text-sm sm:text-[.85rem] mt-[1.5rem] font-normal text-white">
                Date of Birth
              </p>
              <ConfigProvider
                theme={{
                  algorithm: theme.darkAlgorithm,
                  token: {
                    colorPrimaryActive: "#fc923b",
                    colorPrimary: "#fc923b",
                    colorPrimaryHover: "#fc923b",
                    colorText: "#fff",
                  },
                }}
              >
                <DatePicker
                  maxDate={dayjs(range)}
                  value={dayjs(date)}
                  onChange={(date, dateString) => {
                    console.log(dateString);
                    if (dateString.length === 0) {
                    } else {
                      setDate(dayjs(dateString as string));
                    }
                  }}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="flex justify-end w-full items-center mt-10 mr-[3rem] ">
            <div className=" flex justify-between items-center mt-4">
              <p
                onClick={() => router.push("/profile")}
                className="text-color-7 hover:text-[#EA4343]  py-2 px-[.9rem] text-[0.85rem] border border-solid border-[#EA4343]/40 sm:text-sm cursor-pointer hover:bg-[#211416] rounded-lg"
              >
                Cancel
              </p>
              {loading ? (
                <p className="text-color-7 hover:text-[#3DB569]">
                  submitting...
                </p>
              ) : (
                <input
                  type="submit"
                  className="ml-8 text-color-7 hover:text-[#3DB569]   py-2 px-[.9rem] text-[0.85rem] border border-solid border-[#3DB569]/40 sm:text-sm cursor-pointer hover:bg-[#111E18] rounded-lg"
                />
              )}
              {/* Save Changes
              </button> */}
            </div>
          </div>
        </form>
      </div>
      {<Modal isOpen={isOpen} onClose={onClose} />}
    </div>
  );
};

export default ProfileEntries;
