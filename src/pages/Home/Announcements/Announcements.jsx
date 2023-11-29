import SectionTitle from "../../../sharedComponents/SectionTitle/SectionTitle";
import useAnnouncement from "../../../hooks/useAnnouncement";
import useAnnouncementCount from "../../../hooks/useAnnouncementCount";
import EllipsisText from "react-ellipsis-text";

const Announcements = () => {

    const [announcements, refetch] = useAnnouncement()
    const [totalAnnouncements] = useAnnouncementCount()


    console.log("Announcement", announcements)
    const length = totalAnnouncements.totalAnnouncement
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
                                                <div className="lg:w-16 w-10 rounded-full border-2 border-purple-500">
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
                                                <div className="lg:flex hidden">
                                                    <p>
                                                        {announcement.postTitle}
                                                    </p>
                                                </div>
                                                <div className=''>
                                                    <EllipsisText text={announcement.postTitle} length={"5"} />
                                                </div>
                                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                                <button className="btn btn-xs text-xs" onClick={() => document.getElementById(`${index}`).showModal()}>More</button>
                                                <dialog id={`${index}`} className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-lg"></h3>
                                                        <p className="py-4">{announcement.postTitle}</p>
                                                    </div>
                                                </dialog>
                                            </td>
                                            <td className="lg:flex hidden">
                                                <p>{announcement.postDescription}</p>
                                            </td>
                                            <td className="lg:hidden flex flex-col gap-2">
                                                <div className=''>
                                                    <EllipsisText text={announcement.postDescription} length={"20"} />
                                                </div>
                                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                                <button className="btn btn-xs text-xs" onClick={() => document.getElementById(`${index}`).showModal()}>More</button>
                                                <dialog id={`${index}`} className="modal">
                                                    <div className="modal-box">
                                                        <form method="dialog">
                                                            {/* if there is a button in form, it will close the modal */}
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                        <h3 className="font-bold text-lg">Hello!</h3>
                                                        <p className="py-4">{announcement.postDescription}</p>
                                                    </div>
                                                </dialog>
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