import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../sharedComponents/SectionTitle/SectionTitle";
import { axiosPublic } from "../../../hooks/useAxiosPublic";

const Announcements = () => {

    const { refech, data: announcements = [] } = useQuery({
        queryKey: 'announcements',
        queryFn: async () => {
            const res = await axiosPublic.get('/api/announcement')
            return res.data
        }
    })

    console.log("Announcement", announcements)
    const length = announcements.length
    return (
        <>
            {
                length > 0 && <div className="bg-[white] my-8 py-8 rounded-xl">
                    <SectionTitle heading="Announcements" details="You can see the announcements here. Wich is posted by the admin."></SectionTitle>
                    <div data-aos="fade-left">
                        <div className="overflow-x-auto mx-[3vw]">
                            <table className="table border-2 border-purple-500">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            Admin profile
                                        </th>
                                        <th>Name</th>
                                        <th>Announcement Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* row 1 */}
                                    {
                                        announcements.map((announcement, index) => <tr key={index}>
                                            <td className="avatar">
                                                <div className="w-16 rounded-full border-2 border-purple-500">
                                                    <img src={announcement.authorImage} alt="Tailwind-CSS-Avatar-component" />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        <h5>{announcement.authorName}</h5>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p>
                                                    {announcement.postTitle}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <p>{announcement.postDescription}</p>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Announcements;