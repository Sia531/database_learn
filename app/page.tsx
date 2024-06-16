import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Link
          href="/Student"
          className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105"
        >
          <Image
            src="/student.svg"
            alt="Logo 1"
            width={96}
            height={96}
            className="mb-2"
          />
          <span className="text-lg font-semibold">Student</span>
        </Link>
        <Link
          href="/Course"
          className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105"
        >
          <Image
            src="/course.svg"
            alt="Logo 2"
            width={96}
            height={96}
            className="mb-2"
          />
          <span className="text-lg font-semibold">Course</span>
        </Link>
        <Link
          href="/SC"
          className="flex flex-col items-center justify-center p-4 transition-transform transform hover:scale-105"
        >
          <Image
            src="/sc.svg"
            alt="Logo 3"
            width={96}
            height={96}
            className="mb-2"
          />
          <span className="text-lg font-semibold">SC</span>
        </Link>
      </div>
    </div>
  );
}
