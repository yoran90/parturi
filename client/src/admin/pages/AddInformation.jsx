import React, { useEffect } from 'react'
import { FaShareAlt } from 'react-icons/fa'
import { BsTrash3Fill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { addInformationFiled } from '../../store/admin-auth';
import { toast } from 'react-toastify';
import Loading from '../../loading/Loading';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import axios from 'axios';

const AddInformation = () => {

  const [loadingForButton, setLoadingForButton] = React.useState(false);

  const [formData, setFormData] = React.useState({
    phone: '',
    email: '',
    address: '',
    addressUrl: '',
    addressUrlForMap: '',
    openingHours: '',
    holyday: '',
    socialMedia: [{ platform: "", url: "" }]

  });

  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [addressUrl, setAddressUrl] = React.useState('');
  const [addressUrlForMap, setAddressUrlForMap] = React.useState('');
  const [openingHours, setOpeningHours] = React.useState('');
  const [holyday, setHolyday] = React.useState('');
  const [socialMedia, setSocialMedia] = React.useState([{ platform: "", url: "" }]);

  const [loading, setLoading] = React.useState(false);
  
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);



  const handleChange = (index, value) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index] = { ...newSocialMedia[index], url: value };
    setSocialMedia(newSocialMedia);
  }
  const addSocialMediaFiled = () => {
    setSocialMedia([...socialMedia, { platform: "", url: "" }]);
  }
  const removeAnotherSocialMedia = (index) => {
    const newSocialMedia = socialMedia.filter((_, i) => i !== index);
    setSocialMedia(newSocialMedia);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingForButton(true);
    try {
      dispatch(addInformationFiled({ phone, email, address, addressUrl, addressUrlForMap, openingHours, holyday, socialMedia }));
      toast.success('Information added successfully');
    } catch (error) {
      console.log(error);
      
    } finally {
      setLoadingForButton(false);
    }
  } 

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loading width={50} height={50} border='6px' topBorder='6px' borderColor='red' borderTopColor='white' />
      </div>
    )
  }

  const [getInformation, setGetInformation] = React.useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:8001/api/information/getInformation")
        setGetInformation(response.data)
      } catch (error) {
        console.log(error);
        
      } finally {
        setLoading(false);
      }
    }
    fetchInfo()
  }, []);

  useEffect(() => {
    if (getInformation) {
      setPhone(getInformation.phone || "");
      setEmail(getInformation.email || "");
      setAddress(getInformation.address || "");
      setAddressUrl(getInformation.addressUrl || "");
      setAddressUrlForMap(getInformation.addressUrlForMap || "");
      setOpeningHours(getInformation.openingHours || "");
      setHolyday(getInformation.holyday || "");
      setSocialMedia(getInformation.socialMedia?.length ? getInformation.socialMedia : [{ platform: "", url: "" }]);
    }
  }, [getInformation]);


  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center text-slate-700">
        <div className="loader"></div>
        <p className="mt-4 text-sm">Ladataan odota...</p>
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
    );
  }


  return (
    <div className='md:px-6 px-2 h-[95vh] w-full overflow-y-scroll scrollbarStyle pb-12 scrollbarstyle'>
      {/* form */}
      <form onSubmit={handleSubmit} className='md:py-12 md:px-4 p-2 flex flex-col gap-4.5 bg-white md:shadow rounded md:border border-slate-200 mt-4'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-red-600'>AddInformation</h3>
          <p className='text-sm text-red-700'>Here you can add information like phone and address so on plaess chek the form.</p>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">📞 Add Phone Number</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Your phone number (+3581234567890)'/>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">📩 Add Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='example@example.com'/>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">📍 Add Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='border border-slate-300 p-1.5 px-3 rounded' placeholder='Enter your address'/>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">🌐 Add Address URL</label>
          <input
            type="text"
            value={addressUrl}
            onChange={(e) => setAddressUrl(e.target.value)}
            className='border border-slate-300 p-1.5 px-3 rounded'
            placeholder='https://www.google.com/maps/place/...'
          />
          <small className='text-red-600'>Copy the address google URL</small>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">➕ Add opening hours</label>
          <ReactQuill theme="snow" className="h-40 rounded-lg text-sm"  value={openingHours} onChange={setOpeningHours} placeholder="Example: <b>Ma–Pe</b> (10:00 - 19:00) <br/> La–Su (10:00 - 18:00)" />
        </div>
        <hr className='text-slate-300 mt-12' />
        {/* add holy days */}
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">➕ Add Holy Days</label>
          <ReactQuill theme="snow" className="h-40 rounded-lg text-sm"  value={holyday} onChange={setHolyday} placeholder="Example: 22/12/2022 - 23/12/2022 we are closed" />
        </div>
        <small className='text-red-600 mt-8'>Add holy days so if you have any holy days you can add them here.</small>
        <hr className='text-slate-200 mt-4' />
        <div className='mt-4'>
          <p className='text-xs text-red-500 font-semibold'>You can add multiple social media links down ⬇️ if you want just click add another socialmedia.</p>
        </div>
        {
          socialMedia.map((item, index) => (
            <div className='flex flex-col text-sm gap-1 relative' key={index}>
              <label htmlFor="" className='flex items-center gap-2'><FaShareAlt /> Sosial Media Put the Platform URL</label>
              <input type="text"
                value={item.url}
                onChange={(e) => handleChange(index, e.target.value)}
                className='border border-slate-300 p-1.5 px-3 rounded' placeholder='https://www.example.com/example'
              />
              
              <div className='flex flex-col gap-1.5 mt-2'>
                <p>Pleass select platForm</p>
                <select value={item.platform}className='border border-slate-200 rounded text-sm w-[50%] py-2 px-4'
                  onChange={(e) => { 
                    const newSocial = [...socialMedia]
                    newSocial[index].platform = e.target.value;
                    setSocialMedia(newSocial);
                  }}>
                    <option value="">Select Platform</option>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="snapchat">Snapchat</option>
                    <option value="twitter">Twitter</option>
                    <option value="youtube">YouTube</option>
                </select>
              </div>
              
              {
                socialMedia.length > 1 && (
                  <button onClick={() =>  removeAnotherSocialMedia(index)} type='button' className='absolute right-0 top-0 cursor-pointer'>
                <BsTrash3Fill className='text-red-600'/>
              </button>
                )
              }
            </div>
          ))
        }
        <div>
          <button onClick={addSocialMediaFiled} type='button' className='bg-red-600 hover:bg-red-500 py-1.5 px-3 rounded text-xs text-white cursor-pointer'>Add Another Sosiamedia</button><br />
          <small className='text-xs text-red-600'>You can add multiple social media links click the button.</small>
        </div>
        <div className='flex flex-col text-sm gap-1'>
          <label htmlFor="">🌐 Add Address URL For Map</label>
          <input
            type="text"
            value={addressUrlForMap}
            onChange={(e) => setAddressUrlForMap(e.target.value)}
            className='border border-slate-300 p-1.5 px-3 rounded'
            placeholder='https://www.google.com/maps/place/...'
          />
          <small className='text-red-600'>Copy the address google URL for map in share html!</small>
        </div>
        <div className='flex justify-end mt-6'>
          <button className='bg-red-500 text-white py-1.5 px-14 rounded-full text-sm cursor-pointer hover:bg-red-400 flex items-center gap-2'>
            {
              loadingForButton ? <div className='flex items-center justify-center gap-2'>
                <p>Adding</p>
                <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
              </div>  
              : 'Add Information'

            }
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddInformation