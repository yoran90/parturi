import React, { useEffect, useState, useMemo } from 'react';
import Header from '../components/header/Header';
import { useDispatch, useSelector } from 'react-redux';
import { FaReply, FaUpload } from 'react-icons/fa';
import Loading from '../loading/Loading';
import Information from '../components/up-header/Information';
import HolyDay from '../components/holy-day/HolyDay';
import axios from 'axios';
import { toast } from 'react-toastify';
import { userLogout } from '../store/user-auth';
import { IoIosArrowDown, IoIosArrowUp, IoIosInformationCircle } from "react-icons/io";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { FaRegCommentDots } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import ReviewText from './opinion/ReviewText';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteReviewByUser } from '../hooks/useReviews';
import ConfirmDelete from '../admin/pages/ConfirmDelete';



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
  const { userDeleteOwnreviewPost, loadingForDeleteUserReview } = useDeleteReviewByUser();
  const [getOwnReviwes, setGetOwnReviwes] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [loadingForButtonUpdate, setLoadingForButtonUpdate] = useState(false);
  const [openComent, setOpenComent] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [openUserProfileMenu, setOpenUserProfileMenu] = useState(false);
  const [openLikeModel, setOpenLikeModel] = useState(false);
  const [confirmReviewId, setConfirmReviewId] = useState(null);
  const [confirmDeleteUserOwnAccownt, setConfirmDeleteUserOwnAccownt] = useState(false);
  const [loadingConfrimDeleteUserOwnAccount, setLoadingConfirmDeleteUserOwnAccount] = useState(false);


  const handleToggleComentModal = (postId) => {
    setOpenComent(prev => (prev === postId ? null : postId));
  };

  const handleToggleReplyModal = (replyId) => {
    setOpenReply(prev => (prev === replyId ? null : replyId));
  };

  const handleToggleOpenLikesModal = (reviewId) => {
    setOpenLikeModel(prev => (prev === reviewId ? null : reviewId));
  };

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

    setLoadingForButtonUpdate(true);

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
        `${import.meta.env.VITE_API_URL}/api/user/userUpdateData`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
      );
      toast.success(response.data.message, "Pleasse login again");
      dispatch(userLogout());
      navigate('/kirjaudu');
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoadingForButtonUpdate(false);
    }
  };


  /* user review */
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/reviwes/ownReview`, { withCredentials: true });
        setGetOwnReviwes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchReview();
  }, []);

  const handleDeleteReview = async (id) => {
    await userDeleteOwnreviewPost(id);
    setGetOwnReviwes((prev) => prev.filter((item) => item._id !== id));
    toast.success("Review deleted successfully");
    setConfirmReviewId(null);
  }

  /* user delete own account */
  const handleDeleteOwnAccountConfirm = async () => {
    setConfirmDeleteUserOwnAccownt(true);
  }

  const handleDeleteOwnAccount = async () => {
    try {
      setLoadingConfirmDeleteUserOwnAccount(true);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/user/userDeleteOwnAccount`, { withCredentials: true });
      dispatch(userLogout());
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingConfirmDeleteUserOwnAccount(false);
    }
  }


  return (
    <>
      <div className='w-full sticky top-0 z-50'>
        <Information />
        <HolyDay />
        <Header />
      </div>
      <div className='flex gap-1'>
        {/* user profile */}
        <div className={`${openUserProfileMenu ? 'w-full fixed top-0 left-0 z-50 h-full' : 'md:w-[40%] hidden md:block md:sticky top-28 h-[calc(100vh-7rem)]'} bg-slate-100 overflow-y-auto scrollbarStyle`}>
          {openUserProfileMenu && (
              <div className='flex justify-end mt-2 mr-2'>
                <button onClick={() => setOpenUserProfileMenu(false)} className='text-sm'>❌</button>
              </div>
            )
          }
          <div>
            <div className='flex flex-col mt-6 items-center justify-center gap-1.5'>
              <div className='relative'>
                <img className="w-38 h-38 border-slate-300 rounded-full border-2" src={profileSrc} alt="Profile" />
                <label htmlFor="profileImage" className='absolute top-15 left-14 text-white/80 flex flex-col items-center gap-1 justify-center text-xs cursor-pointer'>
                  <input type="file" id='profileImage' onChange={(e) => setProfileImage(e.target.files[0])} className='hidden' />
                  <FaUpload />
                  Upload
                </label>
              </div>
              <div className='mt-1 flex flex-col items-center justify-center'>
                <h3 className='text-slate-600'>{user?.firstName} {user?.lastName}</h3>
                <p className='text-sm text-slate-400'>{user?.email}</p>
              </div>
            </div>
          </div>
           {/* user profile information */}
          <div className='flex items-center gap-2 mt-8 mb-2 pl-4 text-sm text-slate-600'>
            <IoIosInformationCircle />
            <h4>User Information</h4>
          </div>
          <div className='md:h-[56vh] p-4 pb-16 md:overflow-y-scroll scrollbarStyle'>

            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3.5' style={{zoom: '98%'}}>          
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
                  {loadingForButtonUpdate ? (
                    <div className='flex items-center gap-1'>
                      <span>Tallennetaan</span>
                      <Loading width={20} height={20} border='4px' topBorder='4px' borderColor='white' borderTopColor='red' />
                    </div>
                  ) : "Tallenna muutokset"}
                </button>
              </div>
            </form>
            <div className='flex flex-col gap-2 mt-4'>
              <button onClick={() => handleDeleteOwnAccountConfirm()} type='button' className='bg-black text-white py-1.5 px-3 w-full rounded cursor-pointer text-sm'>
                Poista tili
              </button>
              <small className='text-red-600'>Jos poistat tilisi, kaikki tietosi poistetaan pysyvästi ja menetät pääsyn tilillesi.</small>
            </div>
          </div>
        </div>
        {/* end user profile */}

        {/* open model confirm delete own account */}
        { confirmDeleteUserOwnAccownt && (
            <ConfirmDelete
              closeModel={() => setConfirmDeleteUserOwnAccownt(false)} 
              cacelButton="Peruuta"
              headerTitle="Poista oma tili?"
              headerDescription="Haluatko varmasti poistaa oman tilisi? jos poistat tilisi, kaikki tietosi poistetaan pysyvästi ja menetät pääsyn tilillesi. Tilisi poistaminen ei ole mahdollista palauttaa. Haluatko jatkaa? "
              warningMessage="Tili poistetaan pysyvästi etkä voi käyttää tiliäsi enää."
              confirmButton="Poista tili"
              onConfirm={handleDeleteOwnAccount}
              loading={loadingConfrimDeleteUserOwnAccount}
            />
          )
        }
      {/* USER Post */}
      <div className='md:w-[60%] w-full flex-flex-col gap-1.5 mb-12'>
        {/* menu for user perofile for mobile screen */}
        <div onClick={() => setOpenUserProfileMenu(true)} className='m-2 md:hidden flex items-center gap-2 cursor-pointer py-1.5'>
          <div>
            {
              user?.profileImage?.url ? (
                <img className='w-8 h-8 border border-slate-500 rounded-full' src={user?.profileImage?.url} alt="" />
              ) : (
                user?.gender === 'men' ? (
                  <img className='w-8 h-8 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                ) : (
                  <img className='w-8 h-8  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                )
              )
            }
          </div>
          <div className='flex flex-col'>
            <small className='text-sm text-slate-600'>Profiili</small>
          </div>
        </div>
       {/* user review postedt */}
       <div className='m-2'>
        <div className='bg-white sticky shadow py-4 px-2 mt-2 w-full mb-2 border border-slate-200 rounded text-sm'>
          <h3 className='w-full ml-2'>Arvostelusi julkaistu</h3>
        </div>
        {
          getOwnReviwes?.length === 0 && (
            <div className='flex flex-col items-center justify-center gap-2.5 h-screen py-4'>
              <p className='text-sm text-red-600'>Ei arvosteluja</p>
            </div>
          )
        }
        <div className='flex flex-col gap-2.5'>
          {getOwnReviwes?.map((review, index) => (
            <div key={index} className='bg-white border border-slate-200 rounded py-4 px-2'>
              <div className='flex flex-col gap-1.5'>
                <div className='flex justify-between gap-1 mb-3'>
                  <div className='flex flex-col gap-1.5 items-center'>
                    <div className='flex gap-1.5'>
                      {
                        [...Array(5)].map((_, index) => {
                          return (
                            index < review.rating ? 
                            <div key={index}>
                                <GoStarFill className='text-yellow-500' size={16} /> 
                              </div>
                            : 
                            <div key={index}>
                                <GoStar size={16}  className='text-slate-500' />
                              </div>
                          )
                        })
                      }
                    </div>
                    <p className='text-sm'>{review?.rating} / 5</p>
                  </div>
                  <div>
                    <small>{new Date(review?.createdAt).toDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })}</small>
                  </div>
                  <div>
                    <button onClick={() => setConfirmReviewId(review?._id)} className='bg-red-500 hover:bg-red-600 text-xs py-1.5 flex items-center gap-0.5 px-3 rounded text-white cursor-pointer'>
                      <div className='flex items-center gap-0.5'>
                        Poista
                        <BsTrash3Fill />
                      </div>
                    </button>
                    {/* open confrim model to delete review */}
                    {
                      confirmReviewId === review?._id && (
                        <ConfirmDelete 
                          closeModel={() => setConfirmReviewId(false)} 
                          headerTitle="Poistaa Arvostelun?" 
                          headerDescription="Haluatko varmasti poistaa arvostelun?"
                          warningMessage="Arvostelu poistetaan pysyvästi ja menetät pääsyn arvosteluun."
                          cacelButton="Peruuta" 
                          confirmButton="Poista" 
                          onConfirm={() => handleDeleteReview(review?._id)}
                          loading={loadingForDeleteUserReview}
                        />
                      )
                    }
                  </div>
                </div>
                  <ReviewText text={review?.reviewText} />
                <div className=''>
                  {review?.mediaReview && (
                    review.mediaReview.type === 'image' ? (
                      <img
                        className='w-full h-72 object-cover border border-slate-300 rounded mt-2'
                        src={review.mediaReview.url}
                        alt="review"
                      />
                    ) : (
                      <video
                        className='w-full h-72 object-cover border border-slate-300 rounded mt-2'
                        controls
                        autoPlay={false}
                      >
                        <source src={review.mediaReview.url} type="video/mp4" />
                      </video>
                    )
                  )}
                </div>
                <hr className='text-slate-200 mt-2' />
                <div className='flex items-center md:gap-[40%] gap-[25%]'>
                  <div onClick={() => handleToggleOpenLikesModal(review?._id)} className='flex items-center gap-0.5 cursor-pointer'>
                    <p>🩷</p>
                    <p className='flex items-center text-xs'>{review?.likes?.count} Tykkää</p>
                  </div>
                  {/* open model likes user */}
                  {
                    openLikeModel === review?._id && (
                      <div className='fixed w-full z-50 top-0 bottom-0 right-0 leading-0 bg-black/30 flex flex-col items-center justify-center'>
                        <div className='bg-white w-full max-w-xl p-6 pb-8 rounded-md'>
                          <div className='flex justify-end mb-6'>
                            <button onClick={() => setOpenLikeModel(false)} className='text-sm cursor-pointer'>❌</button>
                          </div>
                          <div className='flex flex-col gap-3.5'>
                            {
                              review?.likes?.likedBy.map((like, index) => (
                                <div key={index} className='flex items-center justify-between'>
                                  <div className='flex items-center gap-3.5'>
                                    <div>
                                      {
                                        like?.profileImage ? (
                                          <img className='w-12 h-12 border border-slate-500 rounded-full' src={like?.profileImage} alt="" />
                                        ) : (
                                          like?.gender === 'men' ? (
                                            <img className='w-12 h-12 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                          ) : (
                                            <img className='w-12 h-12 rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                          )
                                        )
                                      }
                                    </div>
                                    <div className='flex flex-col'>
                                      <p className='text-xs'>{like?.firstName} {like?.lastName}</p>
                                      <small className='text-xs text-slate-600'>{new Date(like?.likedAt).toDateString("fi-FI", { year: "numeric", month: "long", day: "numeric" })}</small>
                                    </div>
                                  </div>
                                  <div>
                                    <Link to={`/profile/${like?.userId}`} className='text-xs bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-2 rounded'>Näytä profiili</Link>
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                          {
                            review?.likes?.likedBy.length === 0 && (
                              <p className='text-sm text-center text-red-600'>Kukaan ei ole vielä tykännyt tästä arvostelusta.</p>
                            )
                          }
                        </div>
                      </div>
                    )
                  }
                  <button type='button' onClick={() => handleToggleComentModal(review?._id)} className='flex items-center gap-1.5 cursor-pointer'>
                    <FaRegCommentDots />
                    <p className='flex items-center text-xs'>{review?.comments?.length} Kommentoi</p>
                  </button>
                </div>
                <hr className='text-slate-200' />
                {/* review comments */}
                {
                  openComent === review?._id && (
                    <div className='bg-slate-50 p-4 flex flex-col rounded'>
                      {
                        review?.comments?.map((comment, index) => (
                          <div key={index} className='border-b border-slate-200 py-3 last:border-0'>
                              <div className='flex items-center gap-2.5'>
                                <div>
                                  {
                                    comment?.profileImage ? (
                                      <img className='w-7 h-7 border border-slate-500 rounded-full' src={comment?.profileImage} alt="" />
                                    ) : (
                                      comment?.gender === 'men' ? (
                                        <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                      ) : (
                                        <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                      )
                                    )
                                  }
                                </div>
                                <div className='flex flex-col'>
                                  <p className='text-xs text-slate-600'>{comment?.firstName} {comment?.lastName}</p>
                                  <small className='text-[11px]'>{new Date(comment?.createdAt).toDateString("fi-FI", { year: "numeric", month: "long", day: "numeric" })}</small>
                                </div>
                              </div>
                              <div className='flex flex-col items-start gap-0.5 ml-12 text-justify mt-2'>
                                <p className='text-[13px]'>{comment?.comment}</p>
                                {
                                  comment?.imageComment?.url && (
                                    <img src={comment?.imageComment?.url} alt="" className='w-42 h-32 border border-slate-200 rounded' />
                                  )
                                }
                                {/* replies */}
                                <div className='mt-2'>
                                  <button type='button' onClick={() => handleToggleReplyModal(comment?._id)} className='flex gap-1 text-blue-500 cursor-pointer'>
                                    {
                                      openReply === comment?._id ? (
                                        <IoIosArrowDown />
                                      ) : (
                                        <IoIosArrowUp />
                                      )
                                    }
                                    <p className='text-sm'>
                                      {comment?.replies?.length}
                                    </p>
                                    <p className='text-xs'>vastata</p>
                                    <FaReply className='text-xs' />
                                  </button>
                                </div>
                                {
                                  openReply === comment?._id && (
                                    <div className=' flex flex-col gap-2 mt-2'>
                                      
                                      <div className='flex flex-col gap-3.5'>
                                      {
                                        comment?.replies?.map((reply, index) => (
                                          <div key={index} className='flex flex-col gap-1.5'>
                                            <div className='flex items-center gap-2.5'>
                                              <div>
                                                {
                                                  reply?.profileImage ? (
                                                    <img className='w-6 h-6 border border-slate-500 rounded-full' src={reply?.profileImage} alt="" />
                                                  ) : (
                                                    reply?.gender === 'men' ? (
                                                      <img className='w-7 h-7 rounded-full border border-slate-500 ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxz7qJ9pU6Xj2EJKaRDVz-9Bd0xh2LnMklGw&s" alt="" />
                                                    ) : (
                                                      <img className='w-7 h-7  rounded-full border border-slate-500' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyTL7U0B5VtD9t_jDuPez9aEnn3qyIjTHzug&s" alt="" />
                                                    )
                                                  )
                                                }
                                              </div>
                                              <div className='flex flex-col'>
                                                <p className='text-xs text-slate-600'>{reply?.firstName} {reply?.lastName}</p>
                                                <small className='text-[11px] text-slate-600'>{new Date(reply?.createdAt).toDateString("fi-FI", { year: "numeric", month: "long", day: "numeric" })}</small>
                                              </div>
                                            </div>
                                            <div className='ml-9'>
                                              <p className='text-[12px] text-slate-900'>{reply?.reply}</p>
                                              {
                                                reply?.imageReply?.url && (
                                                  <img src={reply?.imageReply?.url} alt="" className='w-42 h-32 border border-slate-200 rounded' />
                                                )
                                              }
                                            </div>
                                        </div>
                                      )) 
                                      }
                                      </div>
                                      <div className='flex items-center justify-center text-center ml-62'>
                                        {
                                          comment?.replies?.length === 0 && (
                                            <div className='flex items-center w-full text-center justify-center py-2'>
                                              <p className='text-sm text-red-500'>Ei vielä vastauksia ⛔</p>
                                            </div>
                                          )
                                        }
                                      </div>
                                    </div>
                                  )
                                }
                              </div>  
                          </div>
                        ))
                      }
                      {
                        review?.comments?.length === 0 && (
                          <div className='flex items-center justify-center py-2'>
                            <p className='text-sm text-red-500'>Ei vielä kommentteja ⛔</p>
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div>
          ))
          }
        </div>
       </div>
       {/* end user review postedt */}
      </div>
      </div>

    </>
  );
};

export default ProfileUser;

