// "use client";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import React from "react";
// import ProfileSettings from "@/components/ProfileSettings";
// import AccountSettings from "@/components/AccountSettings";

// enum UserSettingsEnum {
//   Profile,
//   Account,
// }

// function UserSettings() {
//   const [profileState, setProfileState] = useState<UserSettingsEnum>(
//     UserSettingsEnum.Profile
//   );

//   const handleProfileClick = () => {
//     setProfileState(UserSettingsEnum.Profile);
//   };

//   const handleAccountClick = () => {
//     setProfileState(UserSettingsEnum.Account);
//   };

//   return (
//     <div className="flex justify-center items-center pt-16 settings-col:pt-8 min-h-screen">
//       <div className="flex flex-col md:flex-row w-full max-w-6xl p-4 h-auto my-auto gap-8">
//         {/* Settings Navigation */}
//         <div className="flex flex-col gap-2 text-center settings-col:text-left w-full settings-col:w-1/4">
//           <Label
//             htmlFor="settings-nav"
//             className="text-2xl font-bold text-center settings-col:text-left"
//           >
//             Settings
//           </Label>
//           <Card
//             id="settings-nav"
//             className="bg-lighterCardForProfile font-bold text-white border-none h-auto w-full md:w-[12rem] rounded-none shadow-2xl text-center md:text-left mx-auto md:mx-0"
//           >
//             <CardContent className="p-4 md:p-6">
//               <ul className="flex flex-col gap-4">
//                 <li
//                   className="text-lg text-center md:text-left hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
//                   onClick={handleProfileClick}
//                 >
//                   PROFILE
//                 </li>
//                 <li
//                   className="text-lg text-center md:text-left hover:border-b-[1px] hover:border-mainPurple hover:cursor-pointer hover:text-mainPurple hover:pb-2"
//                   onClick={handleAccountClick}
//                 >
//                   ACCOUNT
//                 </li>
//               </ul>
//             </CardContent>
//           </Card>
//         </div>

//         {/* User Settings Content */}
//         <div className="flex flex-col gap-4 w-full text-center">
//           <Card className="p-4 bg-lighterCardForProfile font-bold text-white border-none mt-9 h-[40rem] w-full rounded-none shadow-2xl">
//             {profileState === UserSettingsEnum.Profile && <ProfileSettings />}
//             {profileState === UserSettingsEnum.Account && <AccountSettings />}
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserSettings;
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import useAuth from "@/hooks/useAuth";
import { IoIosCheckmark } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import React from "react";
import "@/styles/glow.css";

const cardHslValue = `224, 2%, 4.2%`;

function UserSettings() {
  const percentage = 50;

  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4 items-center justify-start pt-4 min-h-screen">
      <div>
        <header>
          <h1 className="text-xl text-center text-white font-bold">
            Edit Profile
          </h1>
        </header>
      </div>
      <div className="w-3/4">
        <Card
          className={`flex flex-col gap-4 bg-darkerCardForProfile rounded-3xl shadow-2xl border border-gray-700`}
        >
          <CardHeader className="flex flex-col gap-4 items-center justify-center">
            <CardTitle className="text-lg text-center text-white font-bold">
              Complete your profile
            </CardTitle>
            <h1 className="text-4xl text-center text-white font-bold glow-text">
              {percentage}%
            </h1>
            <Progress value={percentage} className="w-[80%] h-[1rem]" />
          </CardHeader>
          <CardContent className="flex flex-col gap-4 items-center justify-center">
            <ul>
              <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                <IoIosCheckmark className="text-4xl" />{" "}
                <p className="text-sm">Setup Account</p>
                <span className="ml-2 text-gray-500 text-sm">10%</span>
              </li>
              <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                <IoIosCheckmark className="text-4xl" />{" "}
                <p className="text-sm">Upload your photo</p>
                <span className="ml-2 text-gray-500 text-sm">5%</span>
              </li>
              <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                <IoIosCheckmark className="text-4xl" />{" "}
                <p className="text-sm">Personal Info</p>
                <span className="ml-2 text-gray-500 text-sm">10%</span>
              </li>
              <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                <IoIosClose className="text-4xl text-gray-500" />{" "}
                <p className="text-sm text-gray-500">Location</p>
                <span className="ml-2 text-mainPurple glow-text">+10%</span>
              </li>
              <li className="flex flex-row text-white font-bold justify-center items-center gap-1">
                <IoIosCheckmark className="text-4xl" />{" "}
                <p className="text-sm ">Biography</p>
                <span className="ml-2 text-gray-500 text-sm">+10%</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div>User Settings</div>
    </div>
  );
}

export default UserSettings;
