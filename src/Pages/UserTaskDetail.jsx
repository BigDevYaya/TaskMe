import React, { useEffect, useState, useCallback } from 'react';
import TaskInfoCard from '../Components/userTaskdetail/TaskInfoCard';
import SubmissionsCard from '../Components/userTaskdetail/SubmissionsCard';
import TaskActions from '../Components/userTaskdetail/TaskActions';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Utils/firebase';

const UserTaskDetail = () => {
  const [task, setTask] = useState({});
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { taskId } = useParams();

  const fetchTask = useCallback(async () => {
    setIsLoading(true);
    try {
      const taskDoc = await getDoc(doc(db, 'tasks', taskId));
      if (taskDoc.exists()) {
        setTask(taskDoc.data());
      } else {
        toast.error('Task not found');
      }
    } catch (err) {
      console.error('Error fetching task:', err);
      toast.error('Failed to fetch task details');
    } finally {
      setIsLoading(false);
    }
  }, [taskId]);

  const getSubmissions = useCallback(async () => {
    try {
      const taskData = await getDoc(doc(db, 'tasks', taskId));
      if (taskData.exists()) {
        const pendingUsersList = taskData.data().unapprovedApplicants || [];
        const approvedUsersList = taskData.data().completedBy || [];
        const allUsers = [...pendingUsersList, ...approvedUsersList];

        const pendingUsersData = await Promise.all(
          pendingUsersList.map(async (userId) => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            return userDoc.exists() ? { id: userId, ...userDoc.data() } : null;
          })
        );

        const approvedUsersData = await Promise.all(
          approvedUsersList.map(async (userId) => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            return userDoc.exists() ? { id: userId, ...userDoc.data() } : null;
          })
        );

        setPendingUsers(pendingUsersData.filter(Boolean));
        setApprovedUsers(approvedUsersData.filter(Boolean));

        const usersData = await Promise.all(
          allUsers.map(async (userId) => {
            const userDoc = await getDoc(doc(db, 'users', userId));
            if (!userDoc.exists()) return null;
            const userData = userDoc.data();
            let status = 'rejected';
            if (approvedUsersData.some((user) => user?.id === userId)) status = 'approved';
            else if (pendingUsersData.some((user) => user?.id === userId)) status = 'pending';

            return {
              id: userId,
              user: userData.uname,
              proof: userData.proof || 'No proof submitted',
              status,
            };
          })
        );

        setSubmissions(usersData.filter(Boolean));
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('An error occurred');
    }
  }, [taskId]);

  const handleApprove = async (userId) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      unapprovedApplicants: arrayRemove(userId),
      completedBy: arrayUnion(userId),
    });
    await updateDoc(doc(db, 'users', userId), {
      pendingTasks: arrayRemove(taskId),
      completedTasks: arrayUnion(taskId),
    });
    await getSubmissions();
  };

  const handleReject = async (userId) => {
    await updateDoc(doc(db, 'tasks', taskId), {
      unapprovedApplicants: arrayRemove(userId),
    });
    await updateDoc(doc(db, 'users', userId), {
      pendingTasks: arrayRemove(taskId),
    });
    await getSubmissions();
  };

  const closeTask = async () => {
    await updateDoc(doc(db, 'tasks', taskId), {
      status: 'Completed',
    });
    await fetchTask();
  };

  useEffect(() => {
    fetchTask();
    getSubmissions();
  }, [fetchTask, getSubmissions]);

  return (
    <div className="p-6 space-y-6">
      <TaskInfoCard task={task} />
      <SubmissionsCard
        task={task}
        pendingUsers={pendingUsers}
        submissions={submissions}
        approvedUsers={approvedUsers}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <TaskActions onClose={closeTask} />
    </div>
  );
};

export default UserTaskDetail;
