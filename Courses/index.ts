class School {
  directions: any = [];

  addDirection(direction: any) {
    this.directions.push(direction);
  }
}

class Direction {
  levels: any = [];

  get name() {
    return this._name;
  }

  constructor(private _name: string) {
    
  }

  addLevel(level: any) {
    this.levels.push(level);
  }
}

class Level {
  groups: any = [];

  constructor(private _name: string, private _program: string) {}

  get name() {
    return this._name;
  }

  get program() {
    return this._program;
  }

  addGroup(group: Group) {
    this.groups.push(group);
  }
}

class Group {
  private _students: Student[] = [];

  get students() {
    return this._students;
  }

  constructor(private directionName: string, private levelName: string) {}

  addStudent(student: Student) {
    this._students.push(student);
  }

  showPerformance() {
    const sortedStudents = this.students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}










class Student {
  grades: { [subject: string]: number } = {};
  attendance: boolean[] = [];

  constructor(
    private firstName: string,
    private lastName: string,
    private birthYear: number
  ) {}

  get fullName() {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value: string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject: string, grade: number) {
    this.grades[subject] = grade;
  }

  markAttendance(present: boolean) {
    this.attendance.push(present);
  }

  getPerformanceRating() {
    const gradeValues = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}