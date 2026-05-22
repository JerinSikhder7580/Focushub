import AvailableRooms from "@/components/AvailableRooms";
import Banner from "@/components/Banner";
import BookingSteps from "@/components/BookingSteps";
import StudyFeatures from "@/components/StudyFeatures";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <AvailableRooms></AvailableRooms>
      <StudyFeatures></StudyFeatures>
      <BookingSteps></BookingSteps>
    </div>
  );
}
