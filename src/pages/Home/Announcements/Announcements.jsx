import SectionTitle from "../../../sharedComponents/SectionTitle/SectionTitle";

const Announcements = () => {
    return (
        <div className="bg-[white] my-8 py-8 rounded-xl">
            <SectionTitle heading="Announcements" details="You can the announcements from the admin."></SectionTitle>
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
                            <tr>
                                <td className="avatar">
                                    <div className="w-16 rounded-full border-2 border-purple-500">
                                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Tailwind-CSS-Avatar-component" />
                                    </div>
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>Purple</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">details</button>
                                </th>
                            </tr>
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Announcements;