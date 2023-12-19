"use client"
import { FC, ReactNode, useState } from "react";
import User from "@/components/User";
import MenuLink from "@/components/menu/menu-link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
interface MainFrameProps {
  children: ReactNode;
}

const MainFrame: FC<MainFrameProps> = ({ children }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const mobileMenuHandler = () =>{
    setMenuIsOpen(!menuIsOpen)
  }
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <div className={(menuIsOpen ? 'flex' : 'hidden')+" absolute w-full h-full justify-center items-center z-10 bg-white shadow-[rgba(0,0,0.1,0.1)_3px_2px_30px_3px] "+ " md:relative md:block md:max-w-[70px] p-3" + " lg:max-w-[300px] "}>
        <MenuLink mobileMenuHandler={mobileMenuHandler}/>
      </div>
      <div className="relative w-full h-full flex flex-col">
        <div className=" bg-white w-full h-[80px] flex items-center justify-between md:justify-end ">
          <Button onClick={mobileMenuHandler}className="block z-20 md:hidden bg-color-transparent hover:bg-color-transparent">
            {menuIsOpen?  <X className=" h-6 w-6 text-gray-500" /> : <Menu className=" h-6 w-6 text-gray-500" />}
          </Button>
          <User/>
        </div>
        <div className=" h-full overflow-hidden ">{children}</div>
      </div>
    </div>
  );
};

export default MainFrame;
