import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaUpload } from 'react-icons/fa';
import { MdAdminPanelSettings } from "react-icons/md";
import Loading from '../loading/Loading';
import Information from '../components/up-header/Information';
import HolyDay from '../components/holy-day/HolyDay';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userLogout } from '../store/user-auth';

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados",
  "Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana",
  "Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon",
  "Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo, Democratic Republic of the",
  "Congo, Republic of the","Costa Rica","Cote d'Ivoire","Croatia","Cuba","Cyprus","Czech Republic",
  "Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea",
  "Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia",
  "Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti",
  "Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea, North","Korea, South","Kosovo",
  "Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
  "Lithuania","Luxembourg","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands",
  "Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro",
  "Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua",
  "Niger","Nigeria","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama",
  "Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
  "Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles",
  "Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan",
  "Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia",
  "Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen",
  "Zambia","Zimbabwe"
];

const ProfileUser = () => {

  const { user, loading } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();


  const [loadingForButton, setLoadingForButton] = useState(false);

  const [favoriteName, setFavoriteName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [timezone, setTimezone] = useState('');
  const [profileImage, setProfileImage] = useState(null);


  useEffect(() => {
    if (user) {
      setFavoriteName(user.favoriteName || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setGender(user.gender || '');
      setEmail(user.email || '');
      setBio(user.bio || '');
      setAddressOne(user.addressOne || '');
      setAddressTwo(user.addressTwo || '');
      setCountry(user.country || '');
      setCity(user.city || '');
      setPostalCode(user.postalCode || '');
      setPhoneNumber(user.phoneNumber || '');
      setNotes(user.notes || '');
      setTimezone(user.timezone || '');
    }
  }, [user]);
  console.log(user);
  


  const profileSrc = useMemo(() => {
    return profileImage
      ? URL.createObjectURL(profileImage)
      : user?.profileImage?.url
      ? user.profileImage.url
      : user?.gender === 'men'
      ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s";
  }, [profileImage, user]);

  useEffect(() => {
    return () => {
      if (profileImage) URL.revokeObjectURL(profileImage);
    };
  }, [profileImage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email) {
      toast.error("First Name, Last Name, and Email are required!");
      return;
    }

    setLoadingForButton(true);

    try {
      const formData = new FormData();
      formData.append('favoriteName', favoriteName);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('gender', gender);
      formData.append('email', email);
      formData.append('bio', bio);
      formData.append('addressOne', addressOne);
      formData.append('addressTwo', addressTwo);
      formData.append('country', country);
      formData.append('city', city);
      formData.append('postalCode', postalCode);
      formData.append('phoneNumber', phoneNumber);
      formData.append('notes', notes);
      formData.append('timezone', timezone);
      if (profileImage) formData.append('image', profileImage);

      const response = await axios.put(
        "http://localhost:8001/api/user/userUpdateData",
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      toast.success(response.data.message, "Pleasse login again");
      dispatch(userLogout());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoadingForButton(false);
    }
  };


  return (
    <>
      <Information />
      <HolyDay />
      <Header />

      <div className='flex flex-col items-center mt-4 mb-12 w-full pt-4 overflow-y-scroll scrollbarStyle'>
        <div className='flex flex-col items-center justify-center gap-1.5'>
          <div>
            <img className="w-28 h-28 rounded-full border" src={profileSrc} alt="Profile" />
          </div>
          <div className='mt-2'>
            <label htmlFor="profileImage" className='flex items-center justify-center border border-slate-400 px-4 py-1 rounded-full text-xs cursor-pointer'>
              <input type="file" id='profileImage' onChange={(e) => setProfileImage(e.target.files[0])} className='hidden' />
              <FaUpload className='mr-1' />
              Upload
            </label>
          </div>
          <h3 className='text-slate-600'>{user?.firstName} {user?.lastName}</h3>
          <p className='text-sm text-slate-400'>{user?.email}</p>
          <button className='bg-green-600 text-white text-sm rounded px-4 py-1 flex gap-1'>
            <MdAdminPanelSettings />
            {user?.role}
          </button>
        </div>

        <form onSubmit={handleSubmit} className='w-full md:px-12 px-4 py-12 flex flex-col gap-3.5' style={{zoom: '98%'}}>
          <div className='md:flex-row flex flex-col gap-5 w-full'>
            {/* Left Column */}
            <div className='md:w-[50%] flex flex-col gap-3.5'>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>First Name</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Last Name</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>My Bio</label>
                <textarea value={bio} onChange={(e) => setBio(e.target.value)} cols="30" rows="8" className='border resize-none overflow-y-scroll scrollbarStyle border-slate-400 rounded focus:outline-none py-1.5 px-3'></textarea>
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>My Notes</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} cols="30" rows="8" className='border resize-none overflow-y-scroll scrollbarStyle border-slate-400 rounded focus:outline-none py-1.5 px-3'></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className='md:w-[50%] flex flex-col gap-3.5'>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Favorite Name</label>
                <input type="text" value={favoriteName} onChange={(e) => setFavoriteName(e.target.value)} placeholder='Enter your favorite name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Address One</label>
                <input type="text" value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Enter your address one' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Address Two</label>
                <input type="text" value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Enter your address two' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Country</label>
                <select value={country} onChange={(e) => setCountry(e.target.value)} className='border text-black border-slate-400 rounded py-2 px-3'>
                  <option value="">Select Country</option>
                  {countries.map((c, index) => (
                    <option className='text-black' key={index} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>City</label>
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your city' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col w-full gap-1 text-sm'>
                <label>Postal Code</label>
                <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder='Enter your postal code' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className='border border-slate-400 rounded py-2 px-3'>
                  <option value="">Select Gender</option>
                  <option value="men">Male</option>
                  <option value="women">Female</option>
                  <option value="none">None</option>
                </select>
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>Phone Number</label>
                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='+1 (234) 567-890' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>
              <div className='flex flex-col gap-1 text-sm'>
                <label>Timezone</label>
                <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder='Enter your timezone' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
              </div>

              <div className='w-full justify-end flex mt-1'>
                <button type='submit' className='bg-red-500 py-1.5 w-full text-sm rounded px-5 mt-4 text-white cursor-pointer flex justify-center items-center'>
                  {loadingForButton ? (
                    <div className='flex items-center gap-1'>
                      <span>Saving</span>
                      <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </form>

        <p className='text-slate-400 text-xs md:px-12 px-4 w-full mt-2'>
          Update your account details, including name, email, gender, profile picture, and more.
        </p>
      </div>
    </>
  );
};

export default ProfileUser;

