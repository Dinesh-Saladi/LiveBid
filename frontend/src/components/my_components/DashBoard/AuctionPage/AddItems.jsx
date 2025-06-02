import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useSocketStore } from "../../../../store/useSocketStore";
import { useState } from "react";
import { useAuthStore } from "../../../../store/useAuthStore";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CloudUpload } from "lucide-react";
import axios from "axios";

function AddItems() {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const { user } = useAuthStore();
  console.log("user");
  console.log(user);
  console.log(user.id);
  function HandleSubmit() {
    console.log(name + " " + basePrice);
    setOpen(false);
  }
  async function HandleFileChange(e) {
    try {
      e.preventDefault();
      console.log(e.target.files);
      const file = e.target.files[0];
      if (!file) {
        console.log("returned");
        return;
      }
      console.log("first");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "LiveBid");
      formData.append("cloud_name", "dvqpwexkd");
      const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dvqpwexkd/image/upload`;
      const res = await axios.post(CLOUDINARY_URL, formData, {
        withCredentials: false,
      });
      console.log(res);
      setImageUrl(res.data.secure_url);
      console.log(res.data.secure_url);
      console.log(imageUrl);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <motion.div className="w-full m-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="default">
            Add Items
          </Button>
        </DialogTrigger>
        <DialogContent className="w-auto max-w-fit min-w-[300px] md:min-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Item</DialogTitle>
            <DialogDescription>
              Fill in the item details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HandleSubmit();
            }}
          >
            {/* laptops */}
            <div className="hidden md:flex flex-row justify-around gap-4">
              <div>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-4">
                    {imageUrl.length > 0 ? (
                      <img
                        src={imageUrl}
                        alt="imageUrl"
                        className="w-full h-48 object-cover rounded-md"
                      />
                    ) : (
                      <CloudUpload className="h-48 w-auto p-4" />
                    )}
                    <Input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={(e) => HandleFileChange(e)}
                    />
                    <Button asChild>
                      <Label htmlFor="file-input">Upload Image</Label>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-4 justify-center w-3/4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter Name"
                  className="col-span-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Label htmlFor="basePrice" className="text-right">
                  Base Price
                </Label>
                <Input
                  id="basePrice"
                  placeholder="Enter Base Price"
                  className="col-span-3"
                  value={basePrice}
                  onChange={(e) => setBasePrice(e.target.value)}
                />
                <Label htmlFor="description" className="text-right">
                  Desription
                </Label>
                <Textarea
                  id="description"
                  placeholder="Enter Description"
                  className="col-span-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            {/* mobiles */}
            <div className="max-h-[70vh] overflow-y-auto flex flex-col md:hidden gap-4 py-4">
              <div>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-4">
                    {imageUrl.length > 0 ? (
                      <img
                        src={imageUrl}
                        alt="imageUrl"
                        className="w-full h-36 object-cover rounded-md"
                      />
                    ) : (
                      <CloudUpload className="h-36 w-auto p-4" />
                    )}
                    <Input
                      id="file-input"
                      type="file"
                      className="hidden"
                      onChange={(e) => HandleFileChange(e)}
                    />
                    <Button asChild>
                      <Label htmlFor="file-input">Upload Image</Label>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter Name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="basePrice" className="text-right">
                Base Price
              </Label>
              <Input
                id="basePrice"
                placeholder="Enter Base Price"
                className="col-span-3"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
              />
              <Label htmlFor="description" className="text-right">
                Desription
              </Label>
              <Textarea
                id="description"
                placeholder="Enter Description"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default AddItems;