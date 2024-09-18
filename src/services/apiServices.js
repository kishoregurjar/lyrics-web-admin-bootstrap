import { toast } from "react-toastify";
import { makeRequest } from './apiRequests'
import { ROUTE_CONSTANT } from "../routes/constant";
import { handleApiError, setAuthToken } from "../utils/authHelpers";

async function loginAdmin(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            "/admin/login-admin",
            payload,
            config
        );
        if (status === 200 && data) {
            toast.success(data.message);
            setAuthToken(data.data);
            navigate(ROUTE_CONSTANT.COMMON.HOME);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function getProfileDetails(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin/admin-profile`,
            {},
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function changePassword(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "PUT",
            `/admin/change-password`,
            payload,
            config
        )
        if (status === 200 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.AUTH.SHOW_PROFILE)
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function forgetPassword(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            `/admin/forget-password`,
            payload,
            config
        )
        if (status === 200 && data) {
            toast.success(data.message)
            navigate(ROUTE_CONSTANT.AUTH.LOGIN)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function resetPassword(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "PUT",
            `/admin/reset-password`,
            payload,
            config
        )
        if (status === 200 && data) {

            toast.success(data.message);
            navigate(ROUTE_CONSTANT.AUTH.LOGIN);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error)
        navigate(ROUTE_CONSTANT.AUTH.FORGET_PASSWORD)
    }
}

async function getNews(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin/get-news-list`,
            {},
            config
        );
        if (status === 200 && data) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function getNewsDetails(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin/get-news?newsId=${payload.newsId}`,
            {},
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.info(data.message)
            return false
        }

    } catch (error) {
        handleApiError(error)
    }
}

async function addNews(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            "/admin/add-news",
            payload,
            config
        )
        if (status === 201 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.NEWS)
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function addNewsCoverPic(payload, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            '/admin/upload-news-avatar',
            payload,
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function deleteNews(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "PUT",
            `/admin/delete-news?newsId=${payload.newsId}`,
            {},
            config
        )
        if (status === 200 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.NEWS)
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function addTestimonial(payload, config, navigate) {
    try {
        const { status, data } = await makeRequest(
            "POST",
            `/admin/add-testimonial`,
            payload,
            config
        )
        if (status === 201 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.TESTIMONIALS)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function addTestimonialProfilePic(payload, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            '/admin/upload-testimonial-avatar',
            payload,
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function getTestimonialList(payload, config) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin/get-testimonials-list`,
            {},
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.info(data.message)
            return false
        }

    } catch (error) {
        handleApiError(error)
    }
}

async function deleteTestimonial(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "PUT",
            `/admin/delete-testimonial?tid=${payload.testimonialId}`,
            payload,
            config
        )
        if (status === 200 && data) {
            toast.success(data.message);
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function getHotSongCard(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            "/admin/get-hot-album",
            payload,
            config
        );
        if (status === 200) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error, navigate);
    }
}

async function deleteHotAlbum(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "DELETE",
            `/admin/delete-song?hotAlbumId=${payload.hotSongId}`,
            payload,
            config
        );
        if (status === 200 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.HOT_ALBUMS);
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function getTopChartCard(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            "/admin/top-chart-list",
            payload,
            config
        );
        if (status === 200) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error, navigate);
    }
}

async function deleteTopChart(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "DELETE",
            `/admin/delete-top-chart?chartId=${payload.chartId}`,
            {},
            config
        );
        if (status === 200 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.TOP_CHART);
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function getFeedback(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            "/admin/get-user-feedbacks-list",
            payload,
            config
        )
        if (status === 200 && data) {
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function editProfile(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "PUT",
            `/admin/edit-admin-profile`,
            payload,
            config
        )
        if (status === 200 && data) {
            toast.success(data.message)
            navigate(ROUTE_CONSTANT.AUTH.SHOW_PROFILE)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function displayLyrics(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            `/admin/get-admin-lyrics`,
            payload,
            config
        )
        if (status === 200 && data) {
            // toast.success(data.message)
            return data
        } else {
            // toast.error(data.message)
            return false;
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function addHotSongs(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            `/admin/add-hot-album`,
            payload,
            config
        );
        if (status === 201 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.HOT_ALBUMS);
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function addHotAlbums(payload = {}, config = {}, navigate) {
    try {
        const { data, status } = await makeRequest(
            "POST",
            `/admin/add-actual-hot-album`,
            payload,
            config
        );
        if (status === 201 && data) {
            toast.success(data.message);
            navigate(ROUTE_CONSTANT.COMMON.HOT_ALBUMS);
            return data;
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        handleApiError(error);
    }
}

async function albumSongs(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin/album/songs?albumId=${payload.albumId}`,
            {},
            config
        );
        if (status === 200 && data) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        handleApiError(error)
    }
}

async function artistSongs(payload, config, navigate) {
    try {
        const { data, status } = await makeRequest(
            "GET",
            `/admin//artist/song?artistId=${payload.artistId}&page=${payload.page}`,
            {},
            config
        );
        if (status === 200 && data) {
            return data;
        } else {
            return false
        }
    } catch (error) {
        handleApiError(error)
    }
}

export const allAPiServicesCall = {
    loginAdmin,
    getProfileDetails,
    editProfile,
    changePassword,
    forgetPassword,
    resetPassword,
    getNews,
    getNewsDetails,
    addNews,
    addNewsCoverPic,
    deleteNews,
    addTestimonial,
    addTestimonialProfilePic,
    getTestimonialList,
    deleteTestimonial,
    getHotSongCard,
    deleteHotAlbum,
    getTopChartCard,
    deleteTopChart,
    getFeedback,
    displayLyrics,
    addHotSongs,
    albumSongs,
    artistSongs,
    addHotAlbums
}

