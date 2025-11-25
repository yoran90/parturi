import React from 'react'
import { FaUpload } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { MdAdminPanelSettings } from "react-icons/md";
import { useEffect } from 'react';
import { getUserById, setAdmin } from '../../store/admin-auth';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../../loading/Loading';

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


const MyAccount = () => {

  const { admin, loading } = useSelector((state) => state.adminAuth);

  const [loadingForButton, setLoadingForButton] = useState(false);
  const [favoriteName, setFavoriteName] = useState(admin?.favoriteName || '');
  const [firstName, setFirstName] = useState(admin?.firstName || '');
  const [lastName, setLastName] = useState(admin?.lastName || '');
  const [gender, setGender] = useState(admin?.gender || '');
  const [email, setEmail] = useState(admin?.email || '');
  const [bio, setBio] = useState(admin?.bio || '');
  const [addressOne, setAddressOne] = useState(admin?.addressOne || '');
  const [addressTwo, setAddressTwo] = useState(admin?.addressTwo || '');
  const [country, setCountry] = useState(admin?.country || '');
  const [city, setCity] = useState(admin?.city || '');
  const [postalCode, setPostalCode] = useState(admin?.postalCode || '');
  const [phoneNumber, setPhoneNumber] = useState(admin?.phoneNumber || '');
  const [notes, setNotes] = useState(admin?.notes || '');
  const [timezone, setTimezone] = useState(admin?.timezone || '');

  const [profileImage, setProfileImage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (admin && admin?.id) {
      dispatch(getUserById(admin.id));

    }
  }, [dispatch]);

  useEffect(() => {
    if (!admin) return;
    setFavoriteName(admin.favoriteName || '');
    setFirstName(admin.firstName || '');
    setLastName(admin.lastName || '');
    setGender(admin.gender || '');
    setEmail(admin.email || '');
    setBio(admin.bio || '');
    setAddressOne(admin.addressOne || '');
    setAddressTwo(admin.addressTwo || '');
    setCountry(admin.country || '');
    setCity(admin.city || '');
    setPostalCode(admin.postalCode || '');
    setPhoneNumber(admin.phoneNumber || '');
    setNotes(admin.notes || '');
    setTimezone(admin.timezone || '');
    setProfileImage(null);
  }, [admin]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      setLoadingForButton(true);

      const formData = new FormData();
      formData.append("favoriteName", favoriteName);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("email", email);
      formData.append("bio", bio);
      formData.append("addressOne", addressOne);
      formData.append("addressTwo", addressTwo);
      formData.append("country", country);
      formData.append("city", city);
      formData.append("postalCode", postalCode);
      formData.append("phoneNumber", phoneNumber);
      formData.append("notes", notes);
      formData.append("timezone", timezone);

      if (profileImage) {
        formData.append("image", profileImage);
      }
 

      const response = await axios.put(`http://localhost:8001/api/auth/updateUser`, formData, 
      {
        withCredentials: true,
      }
      );
      localStorage.setItem("token", response.data.token);
      toast.success("Updated successfully!");
      dispatch({ type: 'adminAuth/updateUserSuccess', payload: response.data.user });
      dispatch(setAdmin(response.data.user));
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingForButton(false);
    }
  }


  
  if (loading || !admin) {
    return (
      <div className='flex flex-col items-center justify-center mt-4 mb-12'>
        <div className='loader'></div>
        <style>{`
          .loader {
            border: 4px solid #ddd;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }


  const profileSrc = profileImage
    ? URL.createObjectURL(profileImage)
    : admin?.profileImage?.url
    ? admin.profileImage.url
    : admin?.gender === 'men'
    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s"
    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s"


  return (
    <div className='flex flex-col items-center mt-4 mb-12 w-full h-[85vh] pt-2 overflow-y-scroll scrollbarStyle'>
      <div className='flex flex-col items-center justify-center gap-1.5'>
        <div>
          <img className="w-28 h-28 rounded-full border" src={profileSrc} alt="Profile" />
        </div>
        <div className='mt-2'>
          <label htmlFor="profileImage" className='flex items-center justify-center border border-slate-400 px-4 py-1 rounded-full text-xs cursor-pointer'>
            <input type="file" id='profileImage' onChange={(e) => setProfileImage(e.target.files[0])} className='hidden' />
            <FaUpload />
            <span className='btn btn-primary'>Upload</span>

          </label>
        </div>
        <h3 className='text-slate-600'>{admin?.firstName} {admin?.lastName}</h3>
        <p className='text-sm text-slate-400'>{admin?.email}</p>
        <button className='bg-green-600 text-white text-sm rounded px-4 py-1 flex gap-1'>
          <MdAdminPanelSettings />
          {admin?.role}
        </button>
      </div>

      <form onSubmit={handleSubmit} className='w-full md:px-26 px-4 py-12 flex flex-col gap-3.5' style={{zoom: '98%'}}>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">My Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} cols="30" rows="6" className='border resize-none overflow-y-scroll scrollbarStyle border-slate-400 rounded focus:outline-none py-1.5 px-3'></textarea>
        </div>
        <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Favorite Name</label>
            <input type="text" value={favoriteName} onChange={(e) => setFavoriteName(e.target.value)} placeholder='Enter your favorite name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
        <div className='flex gap-1'>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='First name' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
        </div>
        <div className='flex gap-1'>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Address One</label>
            <input type="text" value={addressOne} onChange={(e) => setAddressOne(e.target.value)} placeholder='Enter your address One' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Address Two</label>
            <input type="text" value={addressTwo} onChange={(e) => setAddressTwo(e.target.value)} placeholder='Enter your address Two' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
        </div>
        <div className='flex gap-1'>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Country</label>
            <select value={country || ''} onChange={(e) => setCountry(e.target.value)} className='border text-black border-slate-400 rounded py-2 px-3'>
              <option value="">Select Country</option>
              {
                countries?.map((c, index) => {
                  return (
                    <option className='text-black' key={index} value={c}>{c}</option>
                  )
                })
              }
            </select>
          </div>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your address Two' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
          <div className='flex flex-col w-full gap-1 text-sm'>
            <label htmlFor="">Postal Code</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder='Enter your address Two' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
          </div>
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} className='border border-slate-400 rounded py-2 px-3'>
            <option value="">Select Gender</option>
            <option value="men">Male</option>
            <option value="women">Female</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' className={`border border-slate-400 rounded focus:outline-none py-1.5 px-3`} />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Phone Number</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='+1 (234) 567-890' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">Timezone</label>
          <input type="text" value={timezone} onChange={(e) => setTimezone(e.target.value)} placeholder='+1 (234) 567-890' className='border border-slate-400 rounded focus:outline-none py-1.5 px-3' />
        </div>
        <div className='flex flex-col gap-1 text-sm'>
          <label htmlFor="">My Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} cols="30" rows="8" className='border resize-none overflow-y-scroll scrollbarStyle border-slate-400 rounded focus:outline-none py-1.5 px-3'></textarea>
        </div>
        <div className='w-full justify-end flex'>
          <button className='bg-red-500 py-1.5 tex-sm rounded px-5 mt-4 text-white cursor-pointer'>
            {
              loadingForButton ? (
                <div className='flex items-center gap-1'>
                  <span className='mr-2'>Saving</span>
                  <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                </div>
              ) : (
                <div>
                  Save Changes
                </div>
              )
            }
          </button>
        </div>
      </form>
      <p className='text-slate-400 text-xs md:px-26 px-4 w-full'>
        Here you can update your account details, such as your name, email, and gender. also you can put your profile picture and so on
      </p>
    </div>
  )
}

export default MyAccount